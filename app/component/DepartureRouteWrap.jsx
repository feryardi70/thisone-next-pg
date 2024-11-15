"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getSession from "../session";

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
    return <div className="text-5xl">Loading... please wait...</div>;
  }

  return isAuthenticated ? children : null;
}
