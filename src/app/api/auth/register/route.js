import connectDB from "@/lib/connectdb";
import { NextResponse } from "next/server";
import User from "@/lib/model/user";

// export async function POST(req) {
//   // db Connection
//   await connectDB();
//   let body = await req.json();

//   let user = await User.create(body);

//   return NextResponse.json(user, { status: 200, message: "Register Success...."});
// }

export async function POST(req) {
  // try {
    
    await connectDB();
    const body = await req.json();

    console.log("BODY DATA = ", body);

    const user = await User.create(body);
    console.log("USER SAVED= ", user);
    
    return NextResponse.json(user);

  // } catch (err) {

  //   console.log("REGISTER ERROR: ", err);

  //   return NextResponse.json(user);
  // }
}
