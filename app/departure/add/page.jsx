"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { saveDeparture } from "../fetch.product";
import getSession from "@/app/session";
import DepartureRoute from "@/app/component/DepartureRouteWrap";

export default function InsertDeparture() {
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
      destination: "",
      departdate: "",
      departtime: "",
      gate: "",
      remark: "",
    },
    onSubmit: () => {
      setLoading(true);
      //e.preventDefault();
      const departureData = {
        airline: formik.values.airline,
        flightnumber: formik.values.flightnumber,
        destination: formik.values.destination,
        departdate: formik.values.departdate,
        departtime: formik.values.departtime,
        gate: formik.values.gate,
        remark: formik.values.remark,
      };
      //console.log(departureData);
      saveDeparture(departureData).then((response) => {
        //console.log(response);
        if (response.status == 201) {
          setLoading(false);
          alert("Departure added successfully!");
          //router.push("/departure");
        } else {
          console.log("Failed to add data");
          //router.push("/departure");
        }
        router.push("/departure");
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
          <h2 className="mb-5 text-center text-3xl">Form Add Flight Departure</h2>

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

                <label htmlFor="destination" className="mb-1 text-slate-500">
                  Destination
                </label>
                <input
                  type="text"
                  className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-blue-700 rounded-md outline-none"
                  id="destination"
                  name="destination"
                  value={formik.values.destination}
                  onChange={handleChange}
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
                  value={formik.values.departdate}
                  onChange={handleChange}
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
                  value={formik.values.departtime}
                  onChange={handleChange}
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
                  value={formik.values.gate}
                  onChange={handleChange}
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
