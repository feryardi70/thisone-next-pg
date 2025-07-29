"use server";

import { NextResponse } from "next/server";
//import prisma from "../db";
import { cookies } from "next/headers";
import { generateToken } from "./token.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserbyUsername, updateUser } from "@/app/repository/userRepository";

export async function POST(request) {
  try {
    const { username } = await request.json();

    const user = await getUserbyUsername(username);

    if (!user) {
      return NextResponse.json({ msg: "not found" });
    }

    const resetToken = generateToken({ id: user.id, username: user.username });

    cookies().set({
      name: "resetToken",
      value: resetToken,
      httpOnly: true,
      maxAge: 1200,
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error.message);
  }
}

export async function PATCH(request) {
  try {
    const { password } = await request.json();

    const token = cookies().get("resetToken")?.value;

    if (!token) {
      //No resetToken Provided = unauthorized
      return NextResponse.json({ msg: "bad request, server is loafing around" }, { status: 400 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ADD_TOKEN);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        //token expired
        return NextResponse.json({ msg: "Reset password process is expired, please repeat the process" }, { status: 401 });
      }
      //invalid token
      return NextResponse.json({ msg: "server is loafing around" }, { status: 400 });
    }

    const { id } = decoded;

    if (!id) {
      return NextResponse.json({ msg: "server is loafing around, invalid request" }, { status: 400 });
    }

    // Hash the new password
    const hashPass = await bcrypt.hash(password, 10);

    await updateUser(id, { password: hashPass });

    cookies().set({
      name: "resetToken",
      value: null,
      httpOnly: true,
      maxAge: 50,
    });

    return NextResponse.json({ msg: "ok!" }, { status: 200 });
  } catch (error) {
    console.log(error.message);
  }
}
