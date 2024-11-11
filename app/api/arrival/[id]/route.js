import { NextResponse } from "next/server";
import prisma from "../../db";

export async function PUT(request, { params }) {
  //const id = params.id;
  const { id, airline, flightnumber, origin, arrivedate, arrivetime, baggage, remark } = await request.json();

  await prisma.Arrival.update({
    where: {
      id: id,
    },
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
  return NextResponse.json({ msg: "successfully edit Arrival" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;

  const arrival = await prisma.Arrival.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return NextResponse.json({ arrival }, { status: 200 });
}

export async function DELETE(request, { params }) {
  const arriveId = params.id;
  //console.log(departId);
  const id = parseInt(arriveId, 10);

  await prisma.Arrival.delete({
    where: { id: id },
  });
  return NextResponse.json({ msg: "successfully delete Arrival" }, { status: 200 });
}
