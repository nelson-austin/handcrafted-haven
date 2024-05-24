"use client";

import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import Logout from "@/app/logout";
import { User } from "@/app/lib/interface";

export default function Header() {
  const cartCount = useSelector((state: any) => state.cart.totalItems);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session) {
        setUser(session.user as User);
      }
      setIsLoading(false);
    };

    fetchSession();
  }, []);

  if (isLoading) {
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
            <div className="font-bold bg-green-700 text-white m-5 p-2 rounded-md">
              Loading...
            </div>
          </div>
          <div className="text-sky-400 font-semibold leading-none mr-4 md:ml-[270px] md:hover:text-sky-100 lg:ml-[900px]">
            <Link
              href="/cart"
              className="text-[23px] flex flex-col items-center"
            >
              CART{" "}
              <span className="cart-badge text-orange-400 text-[33px]">0</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-25 bg-green-900 rounded-lg m-3 md:h-28">
      <div className="header-items flex items-center justify-between">
        <div className="flex flex-col">
          <Link href="/">
            <div className="flex items-center">
              <Image
                src="/HH-Logo.svg"
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
          {user ? (
            <>
              <Link
                className="font-bold bg-green-900 text-white m-5 p-2 rounded-md hover:bg-green-300 hover:text-black"
                href={`/profile/${user.id}`}
              >
                My Profile
              </Link>
              <Logout />
            </>
          ) : (
            <>
              <Link
                className="font-bold bg-green-900 text-white m-5 p-2 rounded-md hover:bg-green-300 hover:text-black"
                href="/login"
              >
                Login
              </Link>
              <Link
                className="font-bold bg-green-900 text-white m-5 p-2 rounded-md hover:bg-green-300 hover:text-black"
                href="/signup"
              >
                Sign up
              </Link>
            </>
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
