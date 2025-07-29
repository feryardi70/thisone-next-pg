import { NextResponse } from "next/server";
//import prisma from "../db";
import { createArrival, getAllArrivals } from "@/app/repository/arrivalRepository";

export async function POST(request) {
  try {
    const { airline, flightnumber, origin, arrivedate, arrivetime, baggage, remark } = await request.json();
    await createArrival({
      airline,
      flightnumber,
      origin,
      arrivedate,
      arrivetime,
      baggage,
      remark,
    });

    return NextResponse.json({ msg: "add Arrival succeded" }, { status: 201 });
  } catch (error) {
    console.log(error.message);
  }
}

export async function GET(request) {
  const arrivals = await getAllArrivals();
  return NextResponse.json({ arrivals }, { status: 201 });
}
