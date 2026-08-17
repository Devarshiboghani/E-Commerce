import connectDB from "@/lib/connectdb";
import { NextResponse } from "next/server";
import User from "@/lib/model/user";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists with this email" }, { status: 400 });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // Create the user with the hashed password
    const user = await User.create({
      ...body,
      password: hashedPassword,
    });
    
    // Do not return the password in the response
    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json({ message: "Registration successful", user: userResponse }, { status: 201 });

  } catch (err) {
    console.error("REGISTER ERROR: ", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
