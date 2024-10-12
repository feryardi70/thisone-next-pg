import Link from "next/link";

// const getDeparture = async () => {
//   try {
//     const res = await fetch("http://127.0.0.1:3000/api/departure", {
//       cache: "no-store",
//     });

//     //console.log(res.json());

//     if (!res.ok) {
//       throw new Error("failed to fetch data");
//     }

//     //console.log(res.json());
//     return res.json();
//   } catch (error) {
//     console.log(error.message);
//   }
// };

import { useState, useEffect } from "react";
//import axios from "axios";
import { axiosInstance } from "../features/axios.instance";
import SpinnerCss from "./spinnercss";
import { useQuery } from "@tanstack/react-query";
//import App from "./tanstack"
//import { useDeparture } from "./fetch.product";

// useEffect(() => {
//   fetchProducts();
// }, []);

export default function DepartureList() {
  //const departs = await getDeparture();
  //console.log(departs);
  // const [departures, setDepartures] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // const fetchProducts = async () => {
  //   //const [departures, setDepartures] = useState([]);
  //   try {
  //     const departureResponse = await axiosInstance.get("/departure");
  //     //console.log(departureResponse.data);
  //     setDepartures(departureResponse.data.departures);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const departureResponse = await axiosInstance.get("/departure");
      console.log(departureResponse);
      return departureResponse;
    },
  });
  console.log(data);

  const renderDepartures = () => {
    //const { departures, isLoading } = useDeparture();

    return data.map((depart, i) => {
      return (
        <tr key={depart.flightnumber}>
          <td className="text-center w-fit px-3">{++i}</td>
          <td className="hidden">{depart.id}</td>
          <td className="text-center w-fit px-3">{depart.airline}</td>
          <td className="text-center w-fit px-3">{depart.flightnumber}</td>
          <td className="text-center w-fit px-3">{depart.destination}</td>
          <td className="text-center w-fit px-3">{depart.departtime}</td>
          <td className="text-center w-fit px-3">{depart.gate}</td>
          <td className="text-center w-fit px-3">{depart.remark}</td>
          <td className="text-center w-fit px-3">
            <span className="px-3 py-1 bg-green-400 rounded-lg">
              <Link href={`/departure/${depart.id}`} target="_blank">
                edit
              </Link>
            </span>
            <span className="px-2 py-1 bg-red-400 rounded-lg ml-1">
              <Link href={`/departure/delete/${depart.id}`}>delete</Link>
            </span>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <div className="px-10 py-10 border border-red-800">
        <div>
          <h1 className="text-4xl tracking-wide mb-3">Departure Dashboard</h1>
        </div>
        <div className="mb-3">
          <span className="px-3 py-3 bg-sky-950 text-white">Home</span>
          <span className="px-3 py-3 bg-sky-950 text-white">
            <Link href="/departure/add">Add Departure</Link>
          </span>
          <span className="px-3 py-3 bg-sky-950 text-white">View Departure</span>
        </div>

        <table className="w-full table-fixed">
          <thead className="text-lg">
            <tr>
              <th className="text-center w-fit px-3">#</th>
              <th className="hidden">No. Database</th>
              <th className="text-center w-fit px-3">Airline</th>
              <th className="text-center w-fit px-3">Flight Number</th>
              <th className="text-center w-fit px-3">Destination</th>
              <th className="text-center w-fit px-3">Time</th>
              <th className="text-center w-fit px-3">Gate</th>
              <th className="text-center w-fit px-3">Remark</th>
              <th className="text-center w-fit px-3">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-xl">{renderDepartures()}</tbody>
        </table>
        {isLoading ? <SpinnerCss /> : null}
      </div>
    </div>
  );
}
