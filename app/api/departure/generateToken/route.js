import { NextResponse } from "next/server";
//import prisma from "../db";
import jwt from "jsonwebtoken";

export async function POST(request) {
  if (request.method !== "POST") {
    
    return NextResponse.json({ msg: "Method Not Allowed. Use POST." }, { status: 405 });
  }

  try {
    const secret = process.env.ADD_TOKEN;

    // Define your payload
    const payload = { msg: "successfully added departure" };

    // Sign the JWT with a 50-second expiration
    const token = jwt.sign(payload, secret, { expiresIn: "7s" });

    // Send the token as a JSON response
    return NextResponse.json({ token });
    //res.status(200).json({ token });
  } catch (error) {
    // Return 500 if there's any error
    console.error("Error generating token:", error);
    //res.status(500).json({ message: "Error generating token" });
  }
}

export async function GET(request) {
  try {
    const secret = process.env.ADD_TOKEN;

    // Define your payload
    const payload = { msg: "ok" };

    // Sign the JWT with a 50-second expiration
    const token = jwt.sign(payload, secret, { expiresIn: "1000s" });

    // Send the token as a JSON response
    return NextResponse.json({ token });
  } catch (error) {
    // Return 500 if there's any error
    console.error("Error generating token:", error);
    //res.status(500).json({ message: "Error generating token" });
  }
}
