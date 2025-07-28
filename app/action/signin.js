"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const signInCredentials = async (formData) => {
  const { username, password } = formData;

  try {
    await signIn("credentials", { username, password, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialssignIn":
          return { message: "invalid credential" };
        default:
          return { message: "something went wrong" };
      }
    }
    //console.log(error.message);
    throw error;
  }
};
