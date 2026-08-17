import connectDB from "@/lib/connectdb";
import { NextResponse } from "next/server";
import crypto from "crypto";
import Order from "@/lib/model/order";
import Cart from "@/lib/model/cart";

export async function POST(req) {
  try {
    await connectDB();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      shippingAddress,
      cartItems,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = await req.json();

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return NextResponse.json({ message: "Invalid payment signature" }, { status: 400 });
    }

    // Save the order to database
    const newOrder = await Order.create({
      user: userId,
      products: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      shippingAddress,
      paymentMethod: "Razorpay",
      paymentResult: {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      },
      itemsPrice,
      shippingPrice,
      totalPrice,
      isPaid: true,
      paidAt: Date.now(),
    });

    // Clear the user's cart
    await Cart.findOneAndUpdate({ user: userId }, { products: [] });

    return NextResponse.json({ message: "Payment verified successfully", order: newOrder }, { status: 200 });
  } catch (error) {
    console.error("PAYMENT VERIFICATION ERROR: ", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
