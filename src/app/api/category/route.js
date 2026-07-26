import connectDB from "@/lib/connectdb";
import Category from "@/lib/model/category";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find();

    return NextResponse.json(categories);
  } catch (error) {
    console.log("ERROR =", error);

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const category = await Category.create(body);

    return NextResponse.json(category);

  } catch (error) {

    return NextResponse.json(
      {
        message: error.message,
        name: error.name,
      },
      {
        status: 500,
      }
    );
  }
}
