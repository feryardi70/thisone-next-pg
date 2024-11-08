"use client";

import { useState, useEffect } from "react";
import { signInCredentials } from "../action/signin";
import getSession from "../session";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const result = await getSession();

      setSession(result ? true : false);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    if (session === true) {
      router.push("/");
    }
  }, [session, router]);

  const [formState, setFormState] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const formAction = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signInCredentials(formState);
      //console.log("Response from signInCredentials:", result.message);

      if (result) {
        setError("Authentication failed, wrong username and password combination");
      } else {
        console.log("Login successful");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      console.error("Error:", error);
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
      <div className="min-w-[400px] min-h-[450px] shadow-lg flex flex-col justify-center items-center rounded-lg border border-fuchsia-400">
        <div>{error && <p className="text-red-500 mt-4 px-5 mb-2">{error}</p>}</div>
        <h1 className="mb-5 text-5xl">Form Login</h1>
        <form onSubmit={formAction}>
          <div className="flex flex-col">
            <label className="text-lg" htmlFor="username">
              Username
            </label>
            <input className="border mb-1 pl-1" name="username" id="username" type="text" required value={formState.username} onChange={handleChange} />
            <label className="text-lg" htmlFor="password">
              Password
            </label>
            <input className="border mb-1 pl-1" name="password" id="password" type="password" required value={formState.password} onChange={handleChange} />
            <button className="mt-4 bg-fuchsia-400 text-lg py-1" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}