"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import Header from "@/app/(main)/landing-page/partials/header";

const navLinks = [
  { name: "Home", href: "/dashboard" },
  { name: "Inventory", href: "/dashboard/inventory" },
  { name: "Invoices", href: "/dashboard/invoices" },
];

export default function SideNav() {
  const pathname = usePathname();
  return (
    <>
      <div className={`flex flex-col bg-blue-50 p-2 h-full `}>
        <Link href={"/dashboard"} className="">
          <section className="p-10 bg-green-800 rounded-lg w-[350px] m-auto flex items-center justify-center md:w-[280px]">
            <div className="flex flex-col gap-5 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-[85px] h-20 bg-sky-100 p-1 rounded-[50%]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>

              <h3 className="text-sky-100 text-[26px] font-bold">
                Forrest Gump
              </h3>
            </div>
          </section>
        </Link>

        <div className="">
          {navLinks.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "flex flex-col items-center justify-center bg-blue-200 h-10 shrink-0 mx-3 md:hover:bg-blue-300 mt-2 rounded-lg text-blue-900 cursor-pointer",
                  {
                    "bg-blue-300 text-blue-600": pathname === link.href,
                  }
                )}
              >
                <p className="block md:block">{link.name}</p>
              </Link>
            );
          })}
        </div>
        <div className="hidden md:block m-3 rounded-lg bg-white w-[350] h-[300px]"></div>
        <div>
          <Link
            href={"/"}
            className="flex gap-1 items-center justify-center bg-blue-200 h-10 shrink-0 mx-3 md:hover:bg-blue-300 rounded-lg text-blue-900 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
              />
            </svg>
            Logout
          </Link>
        </div>
      </div>
    </>
  );
}
