import { Inter } from "next/font/google";
import Link from "next/link";
import LoginButton from "./loginButton";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function SideComponet() {
  return (
    <div className="flex flex-col items-start bg-blue-300 p-4 rounded-lg shrink-0 md:w-[365px] w-90">
      <p
        className={`${inter.className} text-xl text-gray-900 md:text-3xl md:leading-normal flex-col`}
      >
        <strong>Handcrafted Haven </strong>is an innovative web application that
        aims to provide a platform for artisans and crafters to showcase and
        sell their unique handcrafted items.
      </p>
      <Link href={"/login"}>
        <LoginButton />
      </Link>
    </div>
  );
}
