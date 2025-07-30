"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import SpinnerCss from "../component/spinnercss";
import { useArrivals } from "./fetch.arrival";
import { axiosInstance } from "../features/axios.instance";
import { useRouter } from "next/navigation";
import getSession from "../session";
import DepartureRoute from "../component/DepartureRouteWrap";

export default function ArrivalList() {
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

  const { arrivals, isLoading } = useArrivals();
  const data = arrivals;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArrivalId, setSelectedArrivalId] = useState(null);

  const openModal = (id) => {
    setSelectedArrivalId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArrivalId(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/arrival/${selectedArrivalId}`);
      console.log(response);

      if (response.status == 200) {
        alert("successfully delete arrival");
      }
    } catch (error) {
      console.error("Error deleting arrival:", error);
    } finally {
      closeModal();
    }
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const renderArrivals = () => {
    return data.map((arrive, i) => {
      return (
        <tr key={arrive.id}>
          <td className="text-center w-7 px-3 py-2">{++i}</td>
          <td className="hidden">{arrive.id}</td>
          <td className="text-center px-3 py-2">{arrive.airline}</td>
          <td className="text-center px-3 py-2">{arrive.flightnumber}</td>
          <td className="text-center px-3 py-2">{arrive.origin}</td>
          <td className="text-center px-3 py-2">{arrive.arrivedate}</td>
          <td className="text-center px-3 py-2">{arrive.arrivetime}</td>
          <td className="text-center w-20 px-3 py-2">{arrive.baggage}</td>
          <td className="text-center px-3 py-2">{arrive.remark}</td>
          <td className="text-center px-3 py-2">
            <span className="px-3 py-1 bg-green-400 rounded-lg">
              <Link href={`/arrival/${arrive.id}`}>
                edit
              </Link>
            </span>
            <span className="px-2 py-1 bg-red-400 rounded-lg ml-1">
              <button onClick={() => openModal(arrive.id)}>Delete</button>
            </span>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <DepartureRoute>
        <div className="px-10 py-10 border border-red-800">
          <div>
            <h1 className="text-4xl tracking-wide mb-3">Arrival Dashboard</h1>
          </div>
          <div className="mb-3">
            <span className="px-3 py-3 bg-sky-950 text-white">
              <Link href="/">Home</Link>
            </span>
            <span className="px-3 py-3 bg-sky-950 text-white">
              <Link href="/arrival/add">Add Arrival</Link>
            </span>
            <span className="px-3 py-3 bg-sky-950 text-white">
              <Link href="/viewarrival" target="_blank">
                View Arrival
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
                <th className="text-center px-3">Origin</th>
                <th className="text-center px-3">Arrival Date</th>
                <th className="text-center px-3">Time</th>
                <th className="text-center px-3">Baggage Claim</th>
                <th className="text-center px-3">Remark</th>
                <th className="text-center px-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-xl">{renderArrivals()}</tbody>
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
      </DepartureRoute>
    </div>
  );
}
