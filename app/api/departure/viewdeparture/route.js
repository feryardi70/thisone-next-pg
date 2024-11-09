import { NextResponse } from "next/server";
import prisma from "../../db";

export async function GET(request) {
  const datetime = new Date();
  const yyyy = datetime.getFullYear().toString();
  let mm = datetime.getMonth() + 1;
  let dd = datetime.getDate().toString();

  const bulan = mm < 10 ? "0" + mm : mm;
  const hari = dd < 10 ? "0" + dd : dd;

  const formattedToday = yyyy + "-" + mm + "-" + dd;
  console.log(formattedToday);

  const departures = await prisma.Departure.findMany({
    where: {
      departdate: formattedToday,
    },
    orderBy: {
      departtime: "asc",
    },
  });
  console.log(departures);
  return NextResponse.json({ departures }, { status: 201 });
}
