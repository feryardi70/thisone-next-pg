import { NextResponse } from "next/server";
//import prisma from "../../db";
import { getArrivalById, updateArrival, deleteArrival } from "@/app/repository/arrivalRepository";

export async function PUT(request, { params }) {
  //const id = params.id;
  const { id, airline, flightnumber, origin, arrivedate, arrivetime, baggage, remark } = await request.json();

  await updateArrival(id, {
    airline,
    flightnumber,
    origin,
    arrivedate,
    arrivetime,
    baggage,
    remark,
  });
  return NextResponse.json({ msg: "successfully edit Arrival" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;

  const arrival = await getArrivalById(id);
  return NextResponse.json({ arrival }, { status: 200 });
}

export async function DELETE(request, { params }) {
  const arriveId = params.id;
  //console.log(departId);
  const id = parseInt(arriveId, 10);

  await deleteArrival(id);
  return NextResponse.json({ msg: "successfully delete Arrival" }, { status: 200 });
}
