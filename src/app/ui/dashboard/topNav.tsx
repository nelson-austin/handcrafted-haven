"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function Header() {
  
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <header className="z-50 h-20 bg-green-900 rounded-lg m-3">
        <div className="header-items flex justify-between md:h-28">
          <div className="flex flex-col">
            <Link href="/">
              <div className="flex items-center justify-center h-20 pl-5">
                <Image
                  src="/HH-Logo.png"
                  width={50}
                  height={50}
                  alt="Logo Image"
                />
                <p className="text-sky-100 pl-3 text-[26px] font-bold leading-none">
                  Handcrafted Haven
                </p>
              </div>
            </Link>
          </div>
          <div className="header-items flex items-center justify-between">
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="leading-none mr-4 p-2 w-10 h-10 text-sm text-white rounded-lg md:hidden hover:bg-green-300 hover:text-black focus:outline-none"
              aria-controls="navbar-default"
              aria-expanded="false"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      {isNavOpen && (
        <div className="md:hidden p-5 bg-green-900 rounded-lg ml-20 mr-20 md:h-28">
          <div className="flex flex-col md:flex-row items-center">
            <Link className="font-bold bg-green-900 text-white m-4 rounded-md hover:bg-green-300 hover:text-black" href={'/dashboard'}>Profile</Link>
            <Link className="font-bold bg-green-900 text-white m-4 rounded-md hover:bg-green-300 hover:text-black" href={'/dashboard/inventory'}>Inventory</Link>
            <Link className="font-bold bg-green-900 text-white m-4 rounded-md hover:bg-green-300 hover:text-black" href={'/dashboard/invoices'}>Invoices</Link>
            <Link className="font-bold bg-green-900 text-white m-4 rounded-md hover:bg-green-300 hover:text-black" onClick={() => signOut()} href={'/'}>Log Out</Link>
          </div>
        </div>
      )}
    </>
  );
}
