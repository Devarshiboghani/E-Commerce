import connectDB from "@/lib/connectdb";
import { NextResponse } from "next/server";
import Cart from "@/lib/model/cart";

// Get user's cart
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { userId } = await params;

    const cart = await Cart.findOne({ user: userId }).populate("products.product");

    if (!cart) {
      return NextResponse.json({ products: [] }, { status: 200 });
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("GET CART ERROR: ", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
