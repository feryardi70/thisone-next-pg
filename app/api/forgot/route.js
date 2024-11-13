"use server";

import { NextResponse } from "next/server";
import prisma from "../db";
import { cookies } from "next/headers";
import { generateToken } from "./token.service";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { username } = await request.json();

    const user = await prisma.User.findFirst({
      where: {
        username,
      },
    });

    const resetToken = generateToken({ username: user.username });

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

    const token = cookies().get(resetToken);
    const hashPass = await bcrypt.hash(password, 10);

    const decoded = jwt.verify(token, process.env.ADD_TOKEN);
    const username = decoded.username;

    const user = await prisma.User.findFirst({
      where: {
        username,
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashPass,
      },
    });

    cookies().set({
      name: "resetToken",
      value: null,
      httpOnly: true,
      maxAge: 1200,
    });

    return NextResponse.json({ msg: "ok!" }, { status: 200 });
  } catch (error) {
    console.log(error.message);
  }
}
