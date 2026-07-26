import connectDB from "@/lib/connectdb";
import Category from "@/lib/model/category";
import { NextResponse } from "next/server";

// GET Single Category
export async function GET(req, context) {
  await connectDB();

  const { id } = await context.params;

  const category = await Category.findById(id);

  return NextResponse.json(category);
}

// UPDATE Category
export async function PUT(req, context) {
  await connectDB();

  const { id } = await context.params;
  const body = await req.json();

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );

  return NextResponse.json(updatedCategory);
}

// DELETE Category
export async function DELETE(req, context) {
  await connectDB();

  const { id } = await context.params;

  console.log("Deleting:", id);

  const deletedCategory = await Category.findByIdAndDelete(id);

  if (!deletedCategory) {
    return NextResponse.json(
      { message: "Category not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    id,
  });
}