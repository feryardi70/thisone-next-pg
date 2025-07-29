"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getSession from "../session";
import { ProtectedRouteLoader } from "./RouteLoader";

export default function DepartureRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session) {
        setIsAuthenticated(true);
      } else {
        router.replace("/login");
      }
      setLoading(false);
    };

    fetchSession();
  }, [router]);

  if (loading) {
    return <div><ProtectedRouteLoader /></div>;
  }

  return isAuthenticated ? children : null;
}
