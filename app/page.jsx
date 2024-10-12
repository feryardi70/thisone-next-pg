import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-wrap flex-row">
      <div className="sm:hidden md:inline w-1/6 bg-blue-700 h-screen">
        <div className="text-white text-2xl tracking-wide">
          <div className="ml-5 mt-3 text-yellow-300">Side Bar</div>
          <div className="ml-5 mt-3 hover:bg-fuchsia-600">Departure Dashboard</div>
          <div className="ml-5 mt-3 hover:bg-fuchsia-600">Arrival Dashboard</div>
          <div className="ml-5 mt-3 hover:bg-fuchsia-600">8 Wisata di Nias</div>
        </div>
      </div>
      <div className="w-5/6 bg-nias">
        <div className="min-h-16 flex flex-row justify-between px-5 items-center border-b-2 border-b-red-600">
          <div className="ml-5 text-4xl text-transparent tracking-wide bg-clip-text bg-gradient-to-r from-blue-900 to-black">FLIGHT DASHBOARD</div>
          <div className="min-w-20 py-2 bg-fuchsia-600 text-center rounded">
            <a className="px-2 text-base text-white" href="/logout">
              logout
            </a>
          </div>
        </div>
        <div className="max-w-max ml-10 mt-2 text-white tracking-wide text-3xl bg-fuchsia-600 ">OVERVIEW</div>
        <div className="cards flex flex-row ml-10 mt-5 justify-evenly">
          <div className="card flight-status">
            <Link href="/departure" target="_blank" rel="noopener noreferrer">
              <img className="rounded-lg img-depart" src="/img/departure2.jpg" alt="" />
            </Link>
            <Link href="/departure" target="_blank" rel="noopener noreferrer">
              <h3 className="text-center text-white text-3xl bg-blue-600 py-2">Manage Departure</h3>
            </Link>
          </div>
          <div className="card weather">
            <Link href="/arrival" target="_blank" rel="noopener noreferrer">
              <img className="rounded-lg img-depart" src="/img/arrival2.jpg" alt="" />
            </Link>
            <Link href="http://127.0.0.1:3000/arrival" target="_blank" rel="noopener noreferrer">
              <h3 className="text-center text-white text-3xl bg-blue-600 py-2">Manage Arrival</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
