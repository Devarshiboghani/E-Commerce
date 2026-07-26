import connectDB from "@/lib/connectdb";
import Product from "@/lib/model/product";
import { NextResponse } from "next/server";

// ======================
// Single Product
// ======================

export async function GET(req, { params }) {
  try {
    await connectDB();

    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json(
        {
          message: "Product Not Found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(product, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}