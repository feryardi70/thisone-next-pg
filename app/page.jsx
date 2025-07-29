"use client";

import Link from "next/link";
import { useState } from "react";
import DepartureRoute from "./component/DepartureRouteWrap";
import {
  PlaneTakeoff,
  PlaneLanding,
  LayoutDashboard,
  ChevronsLeft,
  TentTree,
} from "lucide-react";
import { SignOut } from "./component/signout-button";

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <DepartureRoute>
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-sky-50 to-sky-100">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            collapsed ? "w-20" : "w-64"
          } bg-gradient-to-b from-blue-800 to-blue-400 text-white p-5 relative`}
        >
          {/* Header dalam sidebar */}
          <div className="mt-0 mb-5 flex items-center justify-between">
            {!collapsed && (
              <h2 className="text-yellow-300 text-xl font-semibold">
                🛫 Airport Admin
              </h2>
            )}
            <button
              className="bg-white text-blue-700 p-1 rounded-full hover:bg-blue-200"
              onClick={() => setCollapsed(!collapsed)}
            >
              <ChevronsLeft
                className={`transition-transform duration-300 ${
                  collapsed ? "rotate-180" : ""
                }`}
                size={20}
              />
            </button>
          </div>

          <div className="mt-4 space-y-0">
            <div className="flex items-center gap-2 hover:bg-fuchsia-500 p-2 rounded cursor-pointer">
              <LayoutDashboard size={20} />
              {!collapsed && <span>Dashboard</span>}
            </div>
            <Link href="/departure" className="flex items-center gap-2 hover:bg-fuchsia-500 p-2 rounded cursor-pointer">
              <PlaneTakeoff size={20} />
              {!collapsed && <span>Departure</span>}
            </Link>
            <Link href="/arrival" className="flex items-center gap-2 hover:bg-fuchsia-500 p-2 rounded cursor-pointer">
              <PlaneLanding size={20} />
              {!collapsed && <span>Arrival</span>}
            </Link>
            <Link href="/wisata" className="flex items-center gap-2 hover:bg-fuchsia-500 p-2 rounded cursor-pointer">
              <TentTree size={20} />
              {!collapsed && <span>8 Wisata di Nias</span>}
            </Link>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 bg-white border-b-2 flex items-center justify-between px-6 shadow-sm">
            <h1 className="text-2xl font-semibold text-blue-900 tracking-tight">
              Airport Dashboard
            </h1>
            
            <SignOut />
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-y-auto bg-blue-100">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Overview</h2>

            {/* Cards */}
            <div className="flex justify-center items-center gap-10 flex-wrap">
              <div className="w-96 bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-black transition">
                <Link href="/departure">
                  <img
                    src="/img/departure2.jpg"
                    alt="departure"
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <h3 className="text-center text-xl text-white bg-blue-700 py-3">
                    <div className="inline-block hover:border-b hover:border-t-2">
                      Manage Departure
                    </div>
                  </h3>
                </Link>
              </div>
              <div className="w-96 bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-black transition">
                <Link href="/arrival">
                  <img
                    src="/img/arrival2.jpg"
                    alt="arrival"
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <h3 className="text-center text-xl text-white bg-blue-700 py-3">
                    <div className="inline-block hover:border-b hover:border-t-2">
                      Manage Arrival
                    </div>
                  </h3>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </DepartureRoute>
  );
}
