import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import { sendAdminNotification } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    
    // Validate required fields
    if (!data.name || !data.phone || !data.email || !data.treatment || !data.date || !data.timeSlot || !data.paymentId || !data.doctor) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check availability again (Double check for race conditions)
    const existingBookings = await Booking.countDocuments({
      date: new Date(data.date),
      timeSlot: data.timeSlot,
      status: { $ne: "declined" }
    });

    if (existingBookings >= 2) {
      return NextResponse.json({ error: "Slot no longer available" }, { status: 409 });
    }

    const booking = await Booking.create(data);
    
    // Trigger Nodemailer notification to Admin
    await sendAdminNotification(booking);
    
    return NextResponse.json({ success: true, bookingId: booking._id }, { status: 201 });
  } catch (err: any) {
    console.error("❌ Booking Error:", err.message);
    if (err.message.includes("ECONNREFUSED")) {
      return NextResponse.json({ 
        error: "Database connection failed. Please ensure MongoDB is running.",
        status: "db_error" 
      }, { status: 503 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    // Get all bookings for that date to calculate availability
    const bookings = await Booking.find({
      date: new Date(date),
      status: { $ne: "declined" }
    }).select("timeSlot");

    // Group by timeSlot
    const slotCounts: Record<string, number> = {};
    bookings.forEach(b => {
      slotCounts[b.timeSlot] = (slotCounts[b.timeSlot] || 0) + 1;
    });

    // Return slots that are fully booked (count >= 2)
    const unavailableSlots = Object.keys(slotCounts).filter(slot => slotCounts[slot] >= 2);

    return NextResponse.json({ unavailableSlots });
  } catch (err: any) {
    console.error("❌ Availability API Error:", err.message);
    if (err.message.includes("ECONNREFUSED")) {
      return NextResponse.json({ 
        error: "Database connection failed. Please ensure MongoDB is running.",
        status: "db_error" 
      }, { status: 503 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
