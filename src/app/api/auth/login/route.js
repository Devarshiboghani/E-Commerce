import connectDB from "@/lib/connectdb";
import { NextResponse } from "next/server";
import User from "@/lib/model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Check for Admin Login via .env variables
    if (
      body.email === process.env.ADMIN_EMAIL &&
      body.password === process.env.ADMIN_PASSWORD
    ) {
      const adminId = "000000000000000000000000"; // Valid 24-char hex ObjectId for Mongoose
      const token = jwt.sign(
        { userId: adminId, role: "admin", email: body.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      const response = NextResponse.json(
        { 
          message: "Admin Login Success", 
          user: { _id: adminId, email: body.email, role: "admin", firstname: "Admin", lastname: "User" } 
        },
        { status: 200 }
      );

      response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      return response;
    }

    // Regular User Login
    const user = await User.findOne({ email: body.email });

    if (!user) {
      return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
    }

    // Verify password
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userResponse = user.toObject();
    delete userResponse.password;

    const response = NextResponse.json(
      { message: "Login Success", user: userResponse },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR: ", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
