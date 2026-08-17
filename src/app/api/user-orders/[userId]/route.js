import connectDB from "@/lib/connectdb";
import { NextResponse } from "next/server";
import Order from "@/lib/model/order";
import Product from "@/lib/model/product"; // Ensure Product model is registered for populate

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { userId } = await params;

    // Fetch orders, sort by newest first, and populate the product details
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "products.product",
        select: "title image images price",
      });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("FETCH ORDERS ERROR: ", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
