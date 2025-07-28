"use client";

import { useState, useEffect } from "react";
import { signInCredentials } from "../action/signin";
import getSession from "../session";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ShieldUser, Lock, AlertCircle, KeySquare } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formAction = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signInCredentials(formState);
      //console.log("Response from signInCredentials:", result.message);

      if (result) {
        setError("Authentication failed, wrong username and password combination");
      } else {
        setError("");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      console.error("Error:", error);
    }

    setIsLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    // <div className="flex justify-center items-center w-full h-screen">
    //   <div className="min-w-[400px] min-h-[450px] shadow-lg flex flex-col justify-center items-center rounded-lg border border-fuchsia-400">
    //     <div>{error && <p className="text-red-500 mt-4 px-5 mb-2">{error}</p>}</div>
    //     <h1 className="mb-5 text-5xl">Form Login</h1>
    //     <form onSubmit={formAction}>
    //       <div className="flex flex-col">
    //         <label className="text-lg" htmlFor="username">
    //           Username
    //         </label>
    //         <input className="border mb-1 pl-1" name="username" id="username" type="text" placeholder="username" required value={formState.username} onChange={handleChange} />
    //         <label className="text-lg" htmlFor="password">
    //           Password
    //         </label>
    //         <input className="border mb-1 pl-1" name="password" id="password" type="password" placeholder="********" required value={formState.password} onChange={handleChange} />
    //         <button className="mt-4 bg-fuchsia-400 text-lg py-1" type="submit" disabled={loading}>
    //           {loading ? "Authenticating..." : "Login"} {/* Show loading text */}
    //         </button>
    //       </div>
    //     </form>
    //     <div className="mt-2">
    //       Forgot password?{" "}
    //       <Link href="/forgot" className="text-blue-600">
    //         click here
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/img/nias2.jpeg')",
        }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <div className="flex flex-row items-center justify-center gap-2">
                <KeySquare className="h-9 text-yellow-300" />
                <h1 className="text-3xl font-bold text-white mb-0">
                  Form <span className="text-yellow-300">Login</span>
                </h1>
                <KeySquare className="h-9 text-yellow-300" />
              </div>
              <p className="text-white/70"><small>Sign in to continue</small></p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={formAction} className="space-y-3">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-yellow-300 font-medium">
                  Username
                </Label>
                <div className="relative">
                  <ShieldUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formState.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl backdrop-blur-sm focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-yellow-300 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formState.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="pl-12 pr-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl backdrop-blur-sm focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                {/* <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                  />
                  <span className="text-white/70 text-sm">Remember me</span>
                </label> */}
                <Link
                  href="/forgot"
                  className="text-purple-300 hover:text-yellow-300 text-sm font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            {/* <div className="mt-8 text-center">
              <p className="text-white/70">
                {"Don't have an account? "}
                <button className="text-yellow-300 hover:text-white font-medium transition-colors">
                  Sign up here
                </button>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
