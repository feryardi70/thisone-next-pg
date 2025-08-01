import { NextResponse } from "next/server";
//import prisma from "../db";
import bcrypt from "bcryptjs";
import { getUserbyUsername, createUser } from "@/app/repository/userRepository";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const hashPassw = bcrypt.hashSync(password, 10);

    await createUser(username, hashPassw);

    return NextResponse.json({ msg: "successfully register user" }, { status: 201 });
  } catch (error) {
    console.log(error.message);
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  const user = await getUserbyUsername(username);

  // If user is found, return the user data
  return NextResponse.json(user, { status: 200 });
}
