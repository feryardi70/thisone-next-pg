"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "../features/axios.instance";

export default function ViewDeparture() {
  const [departures, setDepartures] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch departures data when the component mounts
  useEffect(() => {
    const fetchDepartures = async () => {
      try {
        const dtime = new Date();
        const year = dtime.getFullYear().toString();
        let m = dtime.getMonth() + 1;
        let day = dtime.getDate().toString();

        const month = m < 10 ? "0" + m : m;
        const hh = day < 10 ? "0" + day : day;

        const formattedDay = year + "-" + month + "-" + hh;

        const response = await axiosInstance.get("/departure/viewdeparture", { params: { departdate: formattedDay } });
        const departures = await response.data.departures;
        setDepartures(departures);
        //console.log(departures);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching departures data:", error);
        setLoading(false);
      }
    };

    fetchDepartures();
  }, []);

  // Set formatted date and update time every second
  useEffect(() => {
    const datetime = new Date();
    const yyyy = datetime.getFullYear().toString();
    const mm = datetime.getMonth();
    const dd = datetime.getDate().toString();

    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const formattedToday = `${dd} ${months[mm]} ${yyyy}`;
    setDate(formattedToday);

    const timer = setInterval(() => {
      const localDate = new Date();
      const currentTime = localDate.toLocaleTimeString("en-US", { hour12: false }).substring(0, 5);
      setTime(currentTime);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Function to determine the logo based on airline code
  const getLogo = (airlineCode) => {
    switch (airlineCode.toUpperCase()) {
      case "QG":
        return "img/citilinkupdate.png";
      case "AK":
        return "img/airasiaupdate.png";
      case "JT":
        return "img/lionairupdate.png";
      case "GA":
        return "img/garudaindoupdate.png";
      case "IU":
        return "img/superairupdate.png";
      case "IW":
        return "img/wingairupdate.png";
      case "ID":
        return "img/batikairupdate.png";
      case "IP":
        return "img/pelitaairupdate.png";
      default:
        return "";
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-0 min-h-screen text-white text-2xl bg-blue-700">
      <table className="w-full">
        <thead className="text-3xl bg-indigo-900">
          <tr>
            <th className="border-b-2 border-b-red-700 p-2 text-center w-[25%]">Flight</th>
            <th className="border-b-2 border-b-red-700 p-2 text-center">Destination</th>
            <th className="border-b-2 border-b-red-700 p-2 text-center">Time</th>
            <th className="border-b-2 border-b-red-700 p-2 text-center">Gate</th>
            <th className="border-b-2 border-b-red-700 p-2 text-center">Remark</th>
          </tr>
        </thead>
        <tbody>
          {departures.length > 0 ? (
            departures.map((depart, index) => (
              <tr key={index}>
                <td className="border-b border-white p-2 w-[25%]">
                  <div className="flex flex-row items-center justify-start">
                    <div className="tampillogo">{getLogo(depart.airline) && <img src={getLogo(depart.airline)} alt={`${depart.airline} logo`} />}</div>
                    <div className="ml-5">
                      <span className="maskapai">{depart.airline.toUpperCase()}</span>
                      <span className="ml-1">{depart.flightnumber}</span>
                    </div>
                  </div>
                </td>
                <td className="border-b border-white p-2 text-center" style={{ textTransform: "uppercase" }}>
                  {depart.destination}
                </td>
                <td className="border-b border-white p-2 text-center">{depart.departtime}</td>
                <td className="border-b border-white p-2 text-center">{depart.gate}</td>
                <td className="border-b border-white p-2 text-center" style={{ textTransform: "uppercase" }}>
                  {depart.remark}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center">
                No departures available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center px-7 mt-14">
        <div className="w-full bg-teal-900 flex flex-col justify-center items-center py-3">
          <div className="text-5xl tracking-widest">DEPARTURE</div>
          <div className="text-2xl tracking-wide">{date}</div>
          <div className="text-4xl tracking-wider">{time}</div>
        </div>
      </div>
    </div>
  );
}
