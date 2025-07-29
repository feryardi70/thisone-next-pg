import { useState, useEffect } from "react";
import { axiosInstance } from "../features/axios.instance";

export const useArrivals = () => {
  const [arrivals, setArrivals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArrivals = async () => {
    try {
      const response = await axiosInstance.get("/arrival");
      const arrivals = await response.data.arrivals;
      
      setArrivals(arrivals);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchArrivals();
  }, []); // Empty dependency array ensures this runs only once on mount

  return { arrivals, isLoading };
};

export async function saveArrival(arrivalData) {
  try {
    const response = await axiosInstance.post("/arrival", arrivalData);

    return response; // Return the response back to the client
  } catch (error) {
    console.error("Error saving arrival:", error);
    throw error; // Handle error appropriately
  }
}

export async function editArrival(id, arrivalData) {
  try {
    const response = await axiosInstance.put(`/arrival/${id}`, arrivalData);

    return response; // Return the response back to the client
  } catch (error) {
    console.error("Error edit arrival:", error);
    throw error; // Handle error appropriately
  }
}
