import connectDB from "@/lib/connectdb";
import Wishlist from "@/lib/model/wishlist";
import Product from "@/lib/model/product";
import { NextResponse } from "next/server";

// ===========================
// Add Wishlist
// ===========================

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    console.log(body);

    const { user, product } = body;

    console.log("USER :", user);
    console.log("PRODUCT :", product);

    // Already Exists?
    const exists = await Wishlist.findOne({
      user,
      product,
    });

    if (exists) {
      return NextResponse.json(exists, {
        status: 200,
      });
    }

    const wishlist = await Wishlist.create({
      user,
      product,
    });

    return NextResponse.json(wishlist, {
      status: 201,
    });
    
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

// ===========================
// Get Wishlist
// ===========================

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const user = searchParams.get("user");

    const wishlist = await Wishlist.find({
      user,
    }).populate("product");

    return NextResponse.json(wishlist, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

// ===========================
// Remove Wishlist
// ===========================

export async function DELETE(req) {
  try {
    await connectDB();

    const body = await req.json();

    const { id } = body;

    await Wishlist.findByIdAndDelete(id);

    return NextResponse.json(
      {
        message: "Wishlist Removed",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
