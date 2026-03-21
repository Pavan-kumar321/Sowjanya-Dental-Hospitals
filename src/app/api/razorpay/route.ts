import { NextResponse } from "next/server";
const Razorpay = require("razorpay");

export async function POST(req: Request) {
  try {
    const { amount, currency = "INR" } = await req.json();

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Use Mock Response if keys are missing or placeholders
    if (!keyId || !keySecret || keyId.includes("example") || keyId.includes("placeholder")) {
      console.warn("⚠️ Using Mock Razorpay Order (Development Mode)");
      return NextResponse.json({
        id: `order_mock_${Date.now()}`,
        amount: amount * 100,
        currency,
        status: "created",
        mock: true
      });
    }

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);
    return NextResponse.json(order);
  } catch (err: any) {
    console.error("❌ Razorpay Order Error:", err.message || err);
    return NextResponse.json({ error: "Failed to create order", details: err.message }, { status: 500 });
  }
}
