"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <span
      className="font-bold bg-green-900 text-white m-5 p-2 rounded-md hover:bg-green-300 hover:text-black cursor-pointer"
      onClick={handleSignOut}
    >
      Logout
    </span>
  );
}
