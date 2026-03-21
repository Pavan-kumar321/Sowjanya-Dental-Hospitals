import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET() {
  try {
    await dbConnect();
    const bookings = await Booking.find().sort({ date: -1, createdAt: -1 });

    const stats = {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      declined: bookings.filter(b => b.status === 'declined').length
    };

    return NextResponse.json({ bookings, stats });
  } catch (err: any) {
    console.error("❌ GET Stats Error:", err.message);
    if (err.message.includes("ECONNREFUSED")) {
      return NextResponse.json({ 
        error: "Database connection failed. Please ensure MongoDB is running.",
        status: "db_error" 
      }, { status: 503 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
