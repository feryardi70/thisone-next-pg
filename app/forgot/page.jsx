"use client";

import { useState } from "react";
import { axiosInstance } from "../features/axios.instance";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  const [formState, setFormState] = useState({ username: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formAction = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await axiosInstance.post("/forgot", formState);
      //console.log("Response from signInCredentials:", result.data);

      if (result.data.user) {
        router.push("/reset");
      } else if (result.data.msg == "not found") {
        setError("Username not found (if you forgot your username, you can not reset your password)");
      } else {
        setError("Server error, Please try again");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error:", error);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="min-w-[400px] min-h-[350px] shadow-lg flex flex-col justify-center items-center rounded-lg border border-fuchsia-400">
        <div className="max-w-[400px]">{error && <p className="text-red-500 mt-4 px-6 mb-2">{error}</p>}</div>
        <h1 className="mb-5 text-2xl px-5">You are resetting your password!</h1>
        <form onSubmit={formAction}>
          <div className="flex flex-col">
            <label className="text-lg" htmlFor="username">
              Username
            </label>
            <input className="border mb-1 pl-1" name="username" id="username" type="text" placeholder="type your username" required value={formState.username} onChange={handleChange} />
            <button className="mt-4 bg-fuchsia-400 text-lg py-1" type="submit" disabled={loading}>
              {loading ? "Checking..." : "Confirm"} {/* Show loading text */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
