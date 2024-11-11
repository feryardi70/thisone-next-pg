"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/app/features/axios.instance";
import { editArrival } from "../fetch.arrival";
import { useRouter } from "next/navigation";

export default function EditArrival() {
  const router = useRouter();
  const { id } = useParams();
  const [arrival, setArrival] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const arrivalResponse = await axiosInstance.get(`/arrival/${id}`);

        setArrival(arrivalResponse.data.arrival);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProductById();
  }, [id]);

  const renderArrival = () => {
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
            value={arrival.airline || ""}
            onChange={(e) => setArrival({ ...arrival, airline: e.target.value })}
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
            value={arrival.flightnumber || ""}
            onChange={(e) => setArrival({ ...arrival, flightnumber: e.target.value })}
            placeholder="1266"
            aria-describedby="flightnumber"
          />

          <label htmlFor="origin" className="mb-1 text-slate-500">
            Origin
          </label>
          <input
            type="text"
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-blue-700 rounded-md outline-none"
            id="origin"
            name="origin"
            value={arrival.origin || ""}
            onChange={(e) => setArrival({ ...arrival, origin: e.target.value })}
            placeholder="nama kota"
            aria-describedby="origin"
          />

          <label htmlFor="arrivedate" className="mb-1 text-slate-500">
            Arrival Date
          </label>
          <input
            type="date"
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-blue-700 rounded-md outline-none"
            id="arrivedate"
            name="arrivedate"
            value={arrival.arrivedate || ""}
            onChange={(e) => setArrival({ ...arrival, arrivedate: e.target.value })}
            aria-describedby="arrivedate"
          />
        </div>

        <div className="flex flex-col w-[48%]">
          <label htmlFor="arrivetime" className="mb-1 text-slate-500">
            Arrival Time
          </label>
          <input
            type="time"
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-blue-700 rounded-md outline-none"
            id="arrivetime"
            name="arrivetime"
            value={arrival.arrivetime || ""}
            onChange={(e) => setArrival({ ...arrival, arrivetime: e.target.value })}
            aria-describedby="arrivetime"
          />

          <label htmlFor="baggage" className="mb-1 text-slate-500">
            Baggage
          </label>
          <input
            type="text"
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-blue-700 rounded-md outline-none"
            id="baggage"
            name="baggage"
            value={arrival.baggage || ""}
            onChange={(e) => setArrival({ ...arrival, baggage: e.target.value })}
            placeholder="01"
            aria-describedby="baggage"
          />

          <label htmlFor="remark" className="mb-1 text-slate-500">
            Remark
          </label>
          <input
            type="text"
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-blue-700 rounded-md outline-none"
            id="remark"
            name="remark"
            value={arrival.remark || ""}
            onChange={(e) => setArrival({ ...arrival, remark: e.target.value })}
            aria-describedby="remark"
          />

          <input type="hidden" name="id" value={arrival.id || ""} />
        </div>
      </div>
    );
  };

  const handleSubmitForEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Handle form submission logic
    const arrivalData = {
      airline: arrival.airline,
      flightnumber: arrival.flightnumber,
      destination: arrival.origin,
      arrivedate: arrival.arrivedate,
      arrivetime: arrival.arrivetime,
      gate: arrival.gate,
      remark: arrival.remark,
      id: arrival.id,
    };
    editArrival(arrivalData.id, arrivalData).then((response) => {
      //console.log(response);
      if (response.status == 200) {
        setArrival(false);
        alert("successfully Edit Arrival!");
      } else {
        console.log("Failed to add data");
      }
      router.push("/arrival");
    });
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="px-5 py-5 shadow-md max-w-xl min-h-96 w-full border-t-4 border-fuchsia-500">
        <h2 className="mb-5 text-center text-3xl">Form Edit Flight Arrival</h2>

        <form onSubmit={(e) => handleSubmitForEdit(e)} className="flex flex-col">
          {renderArrival()}
          <button type="submit" className="px-2 py-2 bg-fuchsia-500 rounded text-white">
            {loading ? "Processing..." : "Edit"}
          </button>
        </form>
      </div>
    </div>
  );
}
