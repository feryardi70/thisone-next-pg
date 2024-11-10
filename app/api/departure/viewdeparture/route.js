import { NextResponse } from "next/server";
import prisma from "../../db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const formattedToday = searchParams.get("departdate");
  console.log(formattedToday);

  const departures = await prisma.Departure.findMany({
    where: {
      departdate: formattedToday,
    },
    orderBy: {
      departtime: "asc",
    },
  });
  //console.log(departures);
  return NextResponse.json({ departures }, { status: 201 });
}
