"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { saveArrival } from "../fetch.arrival";
import getSession from "@/app/session";
import DepartureRoute from "@/app/component/DepartureRouteWrap";

export default function InsertArrival() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const result = await getSession();

      setSession(result ? true : false);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    if (session === false) {
      router.push("/login");
    } else {
      setLoadingSession(false);
    }
  }, [session, router]);

  const formik = useFormik({
    initialValues: {
      airline: "",
      flightnumber: "",
      origin: "",
      arrivedate: "",
      arrivetime: "",
      baggage: "",
      remark: "",
    },
    onSubmit: () => {
      setLoading(true);
      //e.preventDefault();
      const arrivalData = {
        airline: formik.values.airline,
        flightnumber: formik.values.flightnumber,
        origin: formik.values.origin,
        arrivedate: formik.values.arrivedate,
        arrivetime: formik.values.arrivetime,
        baggage: formik.values.baggage,
        remark: formik.values.remark,
      };
      //console.log(departureData);
      saveArrival(arrivalData).then((response) => {
        //console.log(response);
        if (response.status == 201) {
          setLoading(false);
          alert("Arrival added successfully!");
        } else {
          console.log("Failed to add data");
        }
        router.push("/arrival");
      });
    },
  });

  const handleChange = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <DepartureRoute>
        <div className="px-5 py-5 shadow-md max-w-xl min-h-96 w-full border-t-4 border-fuchsia-500">
          <h2 className="mb-5 text-center text-3xl">Form Add Flight Arrival</h2>

          <form onSubmit={formik.handleSubmit} className="flex flex-col">
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
                  value={formik.values.airline}
                  onChange={handleChange}
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
                  value={formik.values.flightnumber}
                  onChange={handleChange}
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
                  value={formik.values.origin}
                  onChange={handleChange}
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
                  value={formik.values.arrivedate}
                  onChange={handleChange}
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
                  value={formik.values.arrivetime}
                  onChange={handleChange}
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
                  value={formik.values.baggage}
                  onChange={handleChange}
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
                  value={formik.values.remark}
                  onChange={handleChange}
                  aria-describedby="remark"
                />
              </div>
            </div>

            <button type="submit" className="px-2 py-2 bg-fuchsia-500 rounded text-white">
              {loading ? "Processing..." : "Add"}
            </button>
          </form>
        </div>
      </DepartureRoute>
    </div>
  );
}
