import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectdb";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    await connectDB();
    const { amount } = await req.json();

    const options = {
      amount: Math.round(amount * 100), // amount in the smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return NextResponse.json({ message: "Failed to create order" }, { status: 500 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("RAZORPAY CREATE ORDER ERROR: ", error);
    return NextResponse.json({ message: error.error?.description || error.message || "Failed to create Razorpay order" }, { status: 500 });
  }
}
