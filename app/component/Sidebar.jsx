'use client'

import Link from "next/link";
import { useState } from "react";
import {
  PlaneTakeoff,
  PlaneLanding,
  LayoutDashboard,
  ChevronsLeft,
  TentTree,
} from "lucide-react";

export default function SideBar(){
    const [collapsed, setCollapsed] = useState(false);

    return(
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

    )

}
