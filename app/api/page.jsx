// "use client";

// import Link from "next/link";

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

// import { useState, useEffect } from "react";
// import axios from "axios";

// const fetchProducts = async () => {
//   const [departures, setDepartures] = useState([]);
//   try {
//     const response = await axios.get("");
//   } catch (error) {}
// };

export default async function API() {
  //const departs = await getDeparture();
  //console.log(departs);
  return (
    <>
      {/* {departs.map((depart) => ( */}
      <div>
        <div className="">airline</div>
        <div className="">215</div>
        <div className="">03</div>
      </div>
      {/* ))} */}
    </>
  );
}
