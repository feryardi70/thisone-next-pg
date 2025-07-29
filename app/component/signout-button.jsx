"use client";

import { signOutAction } from "@/app/action/signout";
import { LogOut } from "lucide-react";

export function SignOut() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="bg-fuchsia-600 text-white px-4 py-2 rounded hover:bg-fuchsia-700 flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" /> Sign Out
      </button>
    </form>
  );
}
