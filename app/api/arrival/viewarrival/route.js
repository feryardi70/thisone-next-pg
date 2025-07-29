import { NextResponse } from "next/server";
//import prisma from "../../db";
import { getArrivalsByDate } from "@/app/repository/arrivalRepository";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const formattedToday = searchParams.get("arrivedate");
  console.log(formattedToday);

  const arrivals = await getArrivalsByDate(formattedToday);
  //console.log(departures);
  return NextResponse.json({ arrivals }, { status: 201 });
}
