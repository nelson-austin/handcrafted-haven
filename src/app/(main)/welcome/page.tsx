import Image from "next/image";
import Link from "next/link";

import Footer from "./partials/footer";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome",
};

export default async function SellerPage() {
  const session = await auth();
    
  return (
    <>
    <div className="grid md:grid-cols-[1fr_1fr] m-10 my-12 gap-7">
      <Image
        src={"/artist-unsplash.jpg"}
        width={500}
        height={500}
        alt="Placeholder desktop image"
        className="rounded-lg hidden md:block m-auto"
      />
      <Image
        src={"/artist-unsplash.jpg"}
        width={560}
        height={620}
        alt="Placeholder mobile image"
        className="block w-[94%] m-auto rounded-lg md:hidden col-[1] row-[1] opacity-70"
      />
      <div className="col-[1] row-[1] z-[1] md:col-[2] bg-white/50 p-10 md:p-0 font-semibold">
        <h1 className="text-[2.5rem] md:text-[4rem]">Start Selling with Handcrafted Haven</h1>
        <p className="text-[1rem]">Your new favorite place to make and sell your handmade items.</p>
        {session
          ? <Link className="" href={`/welcome/start-selling`}>
            <button className="text-[1.2em] text-[white] bg-green-900 hover:bg-green-400 my-5 p-3 rounded-full">Start Selling</button>
            </Link>
          : <Link href={"/signup"}><button className="text-[1.2em] text-[white] bg-green-900 hover:bg-green-400 my-5 p-3 rounded-full">Start Selling</button></Link>}
      </div>
    </div>
    <Footer />
    </>
  );
}