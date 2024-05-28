import Image from "next/image";
import Link from "next/link";

import Footer from "./partials/footer";

export default function SellerPage() {
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
        <Link className="" href={'/'}>Link to sign up</Link>
        {/* <Register /> */}
        {/* <ViewProducts /> */}
        {/* <LearnMore /> */}
        {/* <Buttons /> */}
      </div>
    </div>
    <Footer />
    </>
  );
}
