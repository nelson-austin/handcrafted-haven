"use client";

import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useState } from "react";
import { User } from "@/app/lib/interface";
import { getSession } from "next-auth/react";
import HeaderLinks from "../header/links";

export default function Header() {
  const cartCount: number = useSelector((state: any) => state.cart.totalItems);

  const [user, setUser] = useState({} as User);
  if (user.id === undefined) {
    getSession().then((session) => {
      if (session) {
        setUser(session.user as User);
      }
    });
  }

  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-25 bg-green-900 rounded-lg m-3 md:h-28">
        <div className="header-items flex items-center justify-between">
          <div className="flex flex-col">
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src="/logo-placeholder-image.png"
                  width={100}
                  height={100}
                  alt="Logo Image"
                />
                <p className="text-sky-100 text-[26px] font-bold leading-none">
                  Handcrafted{" "}
                  <span className="text-[51px] md:text-[26px]">Haven</span>
                </p>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <HeaderLinks user={user} cartCount={cartCount} />
          </div>
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
      </header>
      {isNavOpen && (
        <div className="md:hidden mt-[140px] p-10 bg-green-900 rounded-lg ml-20 mb-[-100px] mr-20 md:h-28">
          <HeaderLinks user={user} cartCount={cartCount} />
        </div>
      )}
    </>
  );
}
