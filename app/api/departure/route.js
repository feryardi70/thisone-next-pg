import { NextResponse } from "next/server";
//import dbConnect from "../db";
//import Departure from "../model.js/departure";
import prisma from "../db";
//import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

// export default async function Handler(req, res) {
//   await dbConnect();

//   if (req.method === "POST") {
//     try {
//       const departure = new Departure(req.body);
//       await departure.save();
//       res.status(201).json({ success: true, msg: "successfully add data" });
//     } catch (error) {
//       console.log(error.message);
//     }
//   } else if (req.method === "GET") {
//     try {
//       const departure = await Departure.find();
//       res.status(200).json({ success: true, data: departure });
//     } catch (error) {
//       console.log(error.message);
//     }
//   } else {
//     res.status(405).json({ success: false, msg: "method not allowed" });
//   }
// }

export async function POST(request) {
  try {
    //console.log(request);
    const { airline, flightnumber, destination, departdate, departtime, gate, remark } = await request.json();
    //await dbConnect();
    //console.log(request.body);
    //console.log(error.message);
    await prisma.Departure.create({
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

    // const secret = process.env.ADD_TOKEN;
    // const payload = { msg: "successfully added departure" };
    // const token = jwt.sign(payload, secret, { expiresIn: "50s" });

    return NextResponse.json({ msg: "add Departure succeded" }, { status: 201 });
    //router.push("http://127.0.0.1:3000/departure");
  } catch (error) {
    console.log(error.message);
  }
}

export async function GET(request) {
  //await dbConnect();
  const departures = await prisma.Departure.findMany();
  //JSON.stringify({ ...departures, id: Number(departures.id) });
  //console.log(departures);
  return NextResponse.json({ departures }, { status: 201 });
}
