import { NextResponse } from "next/server";
import prisma from "../../db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const formattedToday = searchParams.get("arrivedate");
  console.log(formattedToday);

  const arrivals = await prisma.Arrival.findMany({
    where: {
      arrivedate: formattedToday,
    },
    orderBy: {
      arrivetime: "asc",
    },
  });
  //console.log(departures);
  return NextResponse.json({ arrivals }, { status: 201 });
}
