"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import SpinnerCss from "../component/spinnercss";
import { useDepartures } from "./fetch.product";
import { axiosInstance } from "../features/axios.instance";
import { useRouter } from "next/navigation";
import getSession from "../session";

export default function DepartureList() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

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

  const { departures, isLoading } = useDepartures();
  const data = departures;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartureId, setSelectedDepartureId] = useState(null);

  const openModal = (id) => {
    setSelectedDepartureId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDepartureId(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/departure/${selectedDepartureId}`);
      console.log(response);

      if (response.status == 200) {
        alert("successfully delete departure");
      }
    } catch (error) {
      console.error("Error deleting departure:", error);
    } finally {
      closeModal();
    }
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const renderDepartures = () => {
    return data.map((depart, i) => {
      return (
        <tr key={depart.id}>
          <td className="text-center w-7 px-3 py-2">{++i}</td>
          <td className="hidden">{depart.id}</td>
          <td className="text-center px-3 py-2">{depart.airline}</td>
          <td className="text-center px-3 py-2">{depart.flightnumber}</td>
          <td className="text-center px-3 py-2">{depart.destination}</td>
          <td className="text-center px-3 py-2">{depart.departdate}</td>
          <td className="text-center px-3 py-2">{depart.departtime}</td>
          <td className="text-center w-20 px-3 py-2">{depart.gate}</td>
          <td className="text-center px-3 py-2">{depart.remark}</td>
          <td className="text-center px-3 py-2">
            <span className="px-3 py-1 bg-green-400 rounded-lg">
              <Link href={`/departure/${depart.id}`} target="_blank">
                edit
              </Link>
            </span>
            <span className="px-2 py-1 bg-red-400 rounded-lg ml-1">
              <button onClick={() => openModal(depart.id)}>Delete</button>
            </span>
          </td>
        </tr>
      );
    });
  };

  const [validToken, setValidToken] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const addToken = localStorage.getItem("addtoken");

      if (typeof addToken == String) {
        console.log("Token is still valid.");
        setValidToken(true);
      }
    }
  }, []);

  return (
    <div>
      {loadingSession ? (
        <div className="text-5xl">loading... please wait...</div>
      ) : (
        <div className="px-10 py-10 border border-red-800">
          <div>
            <h1 className="text-4xl tracking-wide mb-3">Departure Dashboard</h1>
          </div>
          <div className="mb-3">
            <span className="px-3 py-3 bg-sky-950 text-white">
              <Link href="/">Home</Link>
            </span>
            <span className="px-3 py-3 bg-sky-950 text-white">
              <Link href="/departure/add">Add Departure</Link>
            </span>
            <span className="px-3 py-3 bg-sky-950 text-white">
              <Link href="/viewdeparture" target="_blank">
                View Departure
              </Link>
            </span>
          </div>

          <table className="my-4 w-full border-collapse">
            <thead className="text-lg mb-5">
              <tr>
                <th className="text-center w-7 px-3">#</th>
                <th className="hidden">No. Database</th>
                <th className="text-center px-3">Airline</th>
                <th className="text-center px-3">Flight Number</th>
                <th className="text-center px-3">Destination</th>
                <th className="text-center px-3">Departure Date</th>
                <th className="text-center px-3">Time</th>
                <th className="text-center px-3">Gate</th>
                <th className="text-center px-3">Remark</th>
                <th className="text-center px-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-xl">{renderDepartures()}</tbody>
          </table>
          {isLoading ? <SpinnerCss /> : null}
          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this?</h3>
                <div className="flex justify-end space-x-4">
                  <button onClick={handleDelete} className="bg-fuchsia-500 text-white px-4 py-2 rounded">
                    Yes
                  </button>
                  <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded">
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
