"use client";
import Logo from "./logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navLinks = [
  { name: "Home", href: "/dashboard" },
  { name: "Inventory", href: "/dashboard/inventory" },
  { name: "Invoices", href: "/dashboard/invoices" },
];

export default function SideNav() {
  const pathname = usePathname();
  return (
    <div className={`flex flex-col bg-blue-50 p-2 `}>
      <div className="h-25 items-center shrink-0 rounded-lg m-3">
        <h2>My Dashboard</h2>
      </div>
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
    </div>
  );
}
