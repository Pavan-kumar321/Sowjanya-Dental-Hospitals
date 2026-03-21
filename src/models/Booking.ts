import mongoose, { Schema, model, models } from "mongoose";

const BookingSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    treatment: { type: String, required: true },
    otherTreatmentDetail: { type: String },
    date: { type: Date, required: true }, // Stored in UTC
    timeSlot: { type: String, required: true }, // e.g., "09:30 AM"
    status: {
      type: String,
      enum: ["pending", "confirmed", "declined"],
      default: "pending",
    },
    declineReason: { type: String },
    doctor: { type: String, required: true },
    paymentId: { type: String, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Booking = models.Booking || model("Booking", BookingSchema);

export default Booking;
