"use client";

import { useState, useEffect } from "react";
import { axiosInstance } from "../features/axios.instance";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  const [formState, setFormState] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formAction = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formState.password !== formState.confirmPassword) {
      setError("password do not match");
      setLoading(false);
      return;
    }

    try {
      const result = await axiosInstance.patch("/forgot", formState);

      if (!loading && result.status == 200) {
        alert("Password successfully changed");
        router.push("/login");
      } else {
        setError("Failed to reset password");
      }
    } catch (error) {
      if (error.response) {
        // Handle server response errors
        if (error.response.data.msg === "Token has expired") {
          setError("Reset password process is expired");
        } else {
          setError(error.response.data.msg || "Failed to reset password");
        }
      } else if (error.request) {
        // Handle no server response
        setError("Server did not respond. Please try again.");
      } else {
        // Handle client-side or setup errors
        setError("An error occurred. Please try again.");
      }
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
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
        <h1 className="mb-5 text-2xl px-5">Please input new password</h1>
        <form onSubmit={formAction}>
          <div className="flex flex-col">
            <label className="text-lg" htmlFor="password">
              Password
            </label>
            <input className="border mb-1 pl-1" name="password" id="password" type="password" placeholder="********" required value={formState.password} onChange={handleChange} />
            <label className="text-lg" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input className="border mb-1 pl-1" name="confirmPassword" id="confirmPassword" type="password" placeholder="********" required value={formState.confirmPassword} onChange={handleChange} />
            <button className="mt-4 bg-fuchsia-400 text-lg py-1" type="submit" disabled={loading}>
              {loading ? "Processing..." : "Confirm"} {/* Show loading text */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
