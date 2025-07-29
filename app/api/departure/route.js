import { NextResponse } from "next/server";
import { createDeparture, getAllDepartures } from "@/app/repository/departureRepository";


export async function POST(request) {
  try {
    const { airline, flightnumber, destination, departdate, departtime, gate, remark } = await request.json();
    
    await createDeparture({
      airline,
      flightnumber,
      destination,
      departdate,
      departtime,
      gate,
      remark
    });

    return NextResponse.json({ msg: "add Departure succeded" }, { status: 201 });
    //router.push("http://127.0.0.1:3000/departure");
  } catch (error) {
    console.log(error.message);
  }
}

export async function GET(request) {
  const departures = await getAllDepartures();
  
  return NextResponse.json({ departures }, { status: 201 });
}
