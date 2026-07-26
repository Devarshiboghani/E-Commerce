import connectDB from "@/lib/connectdb";
import { NextResponse } from "next/server";
import User from "@/lib/model/user";

export async function POST(req) {
  // db Connection
  await connectDB();
  let body = await req.json();

  let user = await User.findOne({ email: body.email });

  if (!user) {
    return NextResponse.json({ message: "Invalid Crendtial" }, { status: 401 });
  }
  if (user.password !== body.password) {
    return NextResponse.json({ message: "Invalid Crendtial" }, { status: 401 });
  }

  return NextResponse.json(user, { status: 200, message: "Login Success...." });
}
