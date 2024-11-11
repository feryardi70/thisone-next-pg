import { NextResponse } from "next/server";
import prisma from "../db";

export async function POST(request) {
  try {
    const { airline, flightnumber, origin, arrivedate, arrivetime, baggage, remark } = await request.json();
    await prisma.Arrival.create({
      data: {
        airline,
        flightnumber,
        origin,
        arrivedate,
        arrivetime,
        baggage,
        remark,
      },
    });

    return NextResponse.json({ msg: "add Arrival succeded" }, { status: 201 });
  } catch (error) {
    console.log(error.message);
  }
}

export async function GET(request) {
  const arrivals = await prisma.Arrival.findMany();
  return NextResponse.json({ arrivals }, { status: 201 });
}
