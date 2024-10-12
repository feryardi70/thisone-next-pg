import { NextResponse } from "next/server";
//import prisma from "../db";
import jwt from "jsonwebtoken";

export async function POST(request) {
  if (request.method !== "POST") {
    // Return 405 if the method is not POST
    return NextResponse.json({ msg: "Method Not Allowed. Use POST." }, { status: 405 });
    //return res.status(405).json({ message: "Method Not Allowed. Use POST." });
  }

  try {
    const secret = process.env.ADD_TOKEN;

    // Define your payload
    const payload = { msg: "successfully added departure" };

    // Sign the JWT with a 50-second expiration
    const token = jwt.sign(payload, secret, { expiresIn: "30s" });

    // Send the token as a JSON response
    return NextResponse.json({ token });
    //res.status(200).json({ token });
  } catch (error) {
    // Return 500 if there's any error
    console.error("Error generating token:", error);
    //res.status(500).json({ message: "Error generating token" });
  }
}
