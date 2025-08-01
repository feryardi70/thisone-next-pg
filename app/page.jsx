//"use client";
import Link from "next/link";
import DepartureRoute from "./component/DepartureRouteWrap";
import { SignOut } from "./component/signout-button";
import SideBar from "./component/Sidebar";
import Image from "next/image";
//import { redirect } from "next/navigation";
//import getSession from "./session";

export default async function Home() {
  // const session = await getSession();

  // if(!session){
  //   redirect('/login');
  // }

  return (
    <DepartureRoute>
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-sky-50 to-sky-100">
        {/* Sidebar */}
        <SideBar />
        {/* // */}

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
                <Link href="/departure" alt="departure">
                  <Image src="/img/departure2.jpg" alt="departure" width={600} height={300} className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <h3 className="text-center text-xl text-white bg-blue-700 py-3">
                    <div className="inline-block hover:border-b hover:border-t-2">
                      Manage Departure
                    </div>
                  </h3>
                </Link>
              </div>
              <div className="w-96 bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-black transition">
                <Link href="/arrival">
                  <Image src='/img/arrival2.jpg' alt="arrival" width={600} height={300} className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300" />
                  
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
