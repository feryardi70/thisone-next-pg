import { NextResponse } from "next/server";
import { getDeparturesByDate } from "@/app/repository/departureRepository";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const formattedToday = searchParams.get("departdate");
  console.log(formattedToday);

  const departures = await getDeparturesByDate(formattedToday);
  //console.log(departures);
  return NextResponse.json({ departures }, { status: 201 });
}
