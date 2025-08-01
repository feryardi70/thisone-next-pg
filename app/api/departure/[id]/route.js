import { NextResponse } from "next/server";
//import prisma from "../../db";
import { getDepartureById, deleteDeparture, updateDeparture } from "@/app/repository/departureRepository";

export async function PUT(request, { params }) {
  //const id = params.id;
  const { id, airline, flightnumber, destination, departdate, departtime, gate, remark } = await request.json();
  
  await updateDeparture(id, {
    airline,
    flightnumber,
    destination,
    departdate,
    departtime,
    gate,
    remark
  });

  return NextResponse.json({ msg: "successfully edit Departure" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  
  const departure = await getDepartureById(id);

  return NextResponse.json({ departure }, { status: 200 });
}

export async function DELETE(request, { params }) {
  const departId = params.id;
  //console.log(departId);
  const id = parseInt(departId, 10);
  
  await deleteDeparture(id);

  return NextResponse.json({ msg: "successfully delete Departure" }, { status: 200 });
}
