"use client";

import { signOutAction } from "@/app/action/signout";
import { LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  //AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function SignOut() {
  return (
    // <form action={signOutAction}>
    //   <button
    //     type="submit"
    //     className="bg-fuchsia-600 text-white px-4 py-2 rounded hover:bg-fuchsia-700 flex items-center gap-2"
    //   >
    //     <LogOut className="h-4 w-4" /> Sign Out
    //   </button>
    // </form>
    <AlertDialog>
      <AlertDialogTrigger className="bg-fuchsia-600 text-white px-4 py-2 rounded hover:bg-fuchsia-700 flex items-center gap-2">
        <LogOut className="h-4 w-4" />
        Sign Out
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to sign out?
          </AlertDialogTitle>
          {/* <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription> */}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-fuchsia-600">
            <form action={signOutAction}>
              <button
                type="submit">Continue
              </button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
