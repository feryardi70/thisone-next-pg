"use client";

//import Link from "next/link";
import { useState, useEffect } from "react";
//import axios from "axios";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/app/features/axios.instance";
import { editDeparture } from "../fetch.product";
import { useRouter } from "next/navigation";

export default function EditDeparture() {
  const router = useRouter();
  const { id } = useParams();
  const [departure, setDeparture] = useState({});

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const departureResponse = await axiosInstance.get(`/departure/${id}`);

        setDeparture(departureResponse.data.departure);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProductById();
  }, [id]);

  const renderDeparture = () => {
    //let i = 0;
    // const [departure, setDeparture] = useState({
    //   airline: "",
    //   flightnumber: "",
    //   destination: "",
    //   departdate: "",
    //   departtime: "",
    //   gate: "",
    //   remark: "",
    //   id: "",
    // });

    return (
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="airline" className="mb-1 text-slate-500">
            Airline
          </label>
          <input
            type="text"
            maxLength="2"
            className="px-2 py-2 mb-5 border-2 border-fuchsia-200 focus:border-blue-700 rounded-md outline-none"
            id="airline"
            name="airline"
            value={departure.airline}
            onChange={(e) => setDeparture({ ...departure, airline: e.target.value })}
            placeholder="masukkan kode airline"
            aria-describedby="airline"
          />

          <label htmlFor="flightnumber" className="mb-1 text-slate-500">
            Flight Number
          </label>
          <input
            type="number"
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-blue-700 rounded-md outline-none"
            id="flightnumber"
            name="flightnumber"
            value={departure.flightnumber}
            onChange={(e) => setDeparture({ ...departure, flightnumber: e.target.value })}
            placeholder="1266"
            aria-describedby="flightnumber"
          />

          <label htmlFor="destination" className="mb-1 text-slate-500">
            Destination
          </label>
          <input
            type="text"
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-blue-700 rounded-md outline-none"
            id="destination"
            name="destination"
            value={departure.destination}
            onChange={(e) => setDeparture({ ...departure, destination: e.target.value })}
            placeholder="nama kota"
            aria-describedby="destination"
          />

          <label htmlFor="departdate" className="mb-1 text-slate-500">
            Departure Date
          </label>
          <input
            type="date"
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-blue-700 rounded-md outline-none"
            id="departdate"
            name="departdate"
            value={departure.departdate}
            onChange={(e) => setDeparture({ ...departure, departdate: e.target.value })}
            aria-describedby="departdate"
          />
        </div>

        <div className="flex flex-col w-[48%]">
          <label htmlFor="departtime" className="mb-1 text-slate-500">
            Departure Time
          </label>
          <input
            type="time"
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-blue-700 rounded-md outline-none"
            id="departtime"
            name="departtime"
            value={departure.departtime}
            onChange={(e) => setDeparture({ ...departure, departtime: e.target.value })}
            aria-describedby="departtime"
          />

          <label htmlFor="gate" className="mb-1 text-slate-500">
            Gate
          </label>
          <input
            type="text"
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-blue-700 rounded-md outline-none"
            id="gate"
            name="gate"
            value={departure.gate}
            onChange={(e) => setDeparture({ ...departure, gate: e.target.value })}
            placeholder="01"
            aria-describedby="gate"
          />

          <label htmlFor="remark" className="mb-1 text-slate-500">
            Remark
          </label>
          <input
            type="text"
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-blue-700 rounded-md outline-none"
            id="remark"
            name="remark"
            value={departure.remark}
            onChange={(e) => setDeparture({ ...departure, remark: e.target.value })}
            aria-describedby="remark"
          />

          <input type="hidden" name="id" value={departure.id} />
        </div>
      </div>
    );
  };

  const handleSubmitForEdit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    const departureData = {
      airline: departure.airline,
      flightnumber: departure.flightnumber,
      destination: departure.destination,
      departdate: departure.departdate,
      departtime: departure.departtime,
      gate: departure.gate,
      remark: departure.remark,
      id: departure.id,
    };
    editDeparture(departureData.id, departureData).then((response) => {
      console.log(response);
      if (response.data.msg === "successfully edit Departure") {
        alert("successfully Edit Departure!");
        //router.push("/departure");
      } else {
        console.log("Failed to add data");
        //router.push("/departure");
      }
      router.push("/departure");
    });
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="px-5 py-5 shadow-md max-w-xl min-h-96 w-full border-t-4 border-fuchsia-500">
        <h2 className="mb-5 text-center text-3xl">Form Edit Flight Departure</h2>

        <form onSubmit={(e) => handleSubmitForEdit(e)} className="flex flex-col">
          {renderDeparture()}
          <button type="submit" className="px-2 py-2 bg-fuchsia-500 rounded text-white cursor-default">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}
