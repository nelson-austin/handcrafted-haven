"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
  return <span className="font-bold bg-green-900 text-white m-5 p-2 rounded-md hover:bg-green-300 hover:text-black cursor-pointer" onClick={() => signOut()}>Logout</span>;
}
