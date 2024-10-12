import { useState, useEffect } from "react";
import { axiosInstance } from "../features/axios.instance";
//import dotenv from "dotenv";
//import jwt from "jsonwebtoken";

export const useDepartures = () => {
  const [departures, setDepartures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDepartures = async () => {
    try {
      const response = await axiosInstance.get("/departure");
      const departures = await response.data.departures;
      //JSON.stringify({ ...departures, id: Number(departures.id) });
      setDepartures(departures);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDepartures();
  }, []); // Empty dependency array ensures this runs only once on mount

  return { departures, isLoading };
};

export async function saveDeparture(departureData) {
  try {
    const response = await axiosInstance.post("/departure", departureData);

    // Then, call the API route to get the token
    const tokenResponse = await fetch("/api/departure/generateToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(tokenResponse);

    const tokenData = await tokenResponse.json();
    console.log(tokenData);

    localStorage.setItem("addtoken", tokenData.token);
    return response; // Return the response back to the client
  } catch (error) {
    console.error("Error saving departure:", error);
    throw error; // Handle error appropriately
  }
}

export async function editDeparture(id, departureData) {
  try {
    const response = await axiosInstance.put(`/departure/${id}`, departureData);

    return response; // Return the response back to the client
  } catch (error) {
    console.error("Error edit departure:", error);
    throw error; // Handle error appropriately
  }
}
