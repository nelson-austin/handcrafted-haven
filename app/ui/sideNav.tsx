"use client";
import Logo from "../logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navLinks = [
  { name: "Home", href: "/dashboard" },
  { name: "Products", href: "/dashboard/products" },
];

export default function SideNav() {
  const pathname = usePathname();
  return (
    <div className={`flex flex-col bg-blue-50 p-2 `}>
      <div className="flex h-25 items-center shrink-0 bg-green-900 rounded-lg m-3 md:h-40">
        <Logo />
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
