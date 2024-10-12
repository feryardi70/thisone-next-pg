import { NextResponse } from "next/server";
import prisma from "../../db";

export async function PUT(request, { params }) {
  //const id = params.id;
  const { id, airline, flightnumber, destination, departdate, departtime, gate, remark } = await request.json();
  //await dbConnect;
  await prisma.Departure.update({
    where: {
      id: id,
    },
    data: {
      airline,
      flightnumber,
      destination,
      departdate,
      departtime,
      gate,
      remark,
    },
  });
  return NextResponse.json({ msg: "successfully edit Departure" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  //await dbConnect;
  const departure = await prisma.Departure.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return NextResponse.json({ departure }, { status: 200 });
}

export async function DELETE(request, { params }) {
  const departId = params.id;
  console.log(departId);
  const id = parseInt(departId, 10);
  //await dbConnect;
  await prisma.Departure.delete({
    where: { id: id },
  });
  return NextResponse.json({ msg: "successfully delete Departure" }, { status: 200 });
}
