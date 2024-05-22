"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navLinks = [
  {
    name: "Home",
    href: "/dashboard",
    icon: (
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
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    ),
  },
  {
    name: "Inventory",
    href: "/dashboard/inventory",
    icon: (
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
          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
        />
      </svg>
    ),
  },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: (
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
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
        />
      </svg>
    ),
  },
];

export default function SideNav() {
  const pathname = usePathname();
  return (
    <>
      <div className={`flex flex-col md:bg-green-100 p-2 h-full `}>
        <Link href={"/dashboard"} className="">
          <section className="p-10 bg-green-900 rounded-lg w-[370px] m-auto flex items-center justify-center md:w-[280px]">
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

        <div className="flex md:flex-col">
          {navLinks.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "flex gap-1 items-center justify-center bg-green-200 p-2 shrink-0 mx-3 md:hover:bg-green-300 mt-2 rounded-lg text-blue-900 cursor-pointer",
                  {
                    "bg-green-400 text-blue-900": pathname === link.href,
                  }
                )}
              >
                <svg className="w-[55px] h-[55px] md:w-[17px] md:h-[17px]">
                  {link.icon}
                </svg>
                <p className="hidden md:block">{link.name}</p>
              </Link>
            );
          })}
          <div className="hidden md:block m-3 rounded-lg bg-sky-100 w-[350] h-[300px]"></div>
          <div>
            <Link
              href={"/"}
              className="flex gap-1 p-2 mt-2 items-center justify-center bg-green-200 shrink-0 mx-3 md:hover:bg-green-300 rounded-lg text-blue-900 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-[55px] h-[55px] md:w-[17px] md:h-[17px] "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                />
              </svg>
              <p className="hidden md:block">Logout</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
