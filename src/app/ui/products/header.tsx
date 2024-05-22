"use client";

import Link from "next/link";
import Image from "next/image";
import Search from "@/app/ui/search";
import { useSelector } from "react-redux";
import { useState } from "react";
import { User } from "@/app/lib/interface";
import { getSession } from "next-auth/react";
import Logout from "@/app/logout";

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

  return (
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
        <div className="flex flex-row">
          {!!user.id && (
            <Link
              className="font-bold bg-green-900 text-white m-5 p-2 rounded-md hover:bg-green-300 hover:text-black"
              href={`/profile/${user.id}`}
            >
              My Profile
            </Link>
          )}
          {!!user.id && <Logout />}
          {!user.id && (
            <Link
              className="font-bold bg-green-900 text-white m-5 p-2 rounded-md hover:bg-green-300 hover:text-black"
              href="/login"
            >
              Login
            </Link>
          )}
          {!user.id && (
            <Link
              className="font-bold bg-green-900 text-white m-5 p-2 rounded-md hover:bg-green-300 hover:text-black"
              href="/signup"
            >
              Sign up
            </Link>
          )}
        </div>
        <div className="text-sky-400 font-semibold leading-none mr-4 md:ml-[270px] md:hover:text-sky-100 lg:ml-[900px]">
          <Link href="/cart" className="text-[23px] flex flex-col items-center">
            CART{" "}
            <span className="cart-badge text-orange-400 text-[33px]">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
