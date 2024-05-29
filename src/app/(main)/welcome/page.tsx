import Image from "next/image";
import Link from "next/link";
import { authOptions } from "@/app/lib/authOptions";
import { getServerSession } from "next-auth";

import Footer from "./partials/footer";

export default async function SellerPage() {
  const session = await getServerSession(authOptions);
    
  return (
    <>
    <div className="grid grid-cols-[1fr_2fr] m-3 my-12">
      <Image
        src={"/artist-unsplash.jpg"}
        width={500}
        height={560}
        alt="Placeholder desktop image"
        className="rounded-lg hidden md:block m-auto"
      />
      <Image
        src={"/mobile-placeholder.png"}
        width={560}
        height={620}
        alt="Placeholder mobile image"
        className="block w-[94%] m-auto rounded-lg md:hidden"
      />
      <div className="">
        <h1 className="text-[2rem]">Start Selling Today</h1>
        {session
          ? <Link className="" href={`/welcome/start-selling`}>
            <button>Start Selling</button>
            </Link>
          : <Link href={"/signup"}><button>Start Selling</button></Link>}
      </div>
    </div>
    <Footer />
    </>
  );
}