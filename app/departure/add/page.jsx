"use client";

//import Link from "next/link";
//import { useState, useEffect } from "react";
//import axios from "axios";
//import { useParams } from "next/navigation";
//import { axiosInstance } from "@/app/features/axios.instance";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { saveDeparture } from "../fetch.product";

export default function InsertDeparture() {
  const router = useRouter();

  // const [data, setData] = useState({
  //   airline: "",
  //   flightnumber: "",
  //   destination: "",
  //   departdate: "",
  //   departtime: "",
  //   gate: "",
  //   remark: "",
  // });

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
        console.log(response);
        if (response.data.msg === "add Departure succeeded") {
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

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setData({
  //     ...data,
  //     [e.target.name]: value,
  //   });
  // };

  const handleChange = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const departureData = {
  //     airline: data.airline,
  //     flightnumber: data.flightnumber,
  //     destination: data.destination,
  //     departdate: data.departdate,
  //     departtime: data.departtime,
  //     gate: data.gate,
  //     remark: data.remark,
  //   };
  //   //console.log(departureData);
  //   axiosInstance.post("/departure", departureData).then((response) => {
  //     console.log(response.data.msg);
  //     if (response.data.msg == "add Departure succeded") {
  //       router.push("/departure");
  //     } else {
  //       console.log("failed to add data");
  //     }
  //   });
  // };

  return (
    <div className="flex h-screen justify-center items-center">
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
              <input type="text" className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-blue-700 rounded-md outline-none" id="remark" name="remark" value={formik.values.remark} onChange={handleChange} aria-describedby="remark" />
            </div>
          </div>

          <button type="submit" className="px-2 py-2 bg-fuchsia-500 rounded text-white cursor-default">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
