import Image from "next/image";
import ViewProducts from "./view-products";

export default function HeroViewProducts() {
  return (
    <div className="">
      <Image
        src={"/desktop-hero.png"}
        width={1000}
        height={560}
        alt="Placeholder desktop image"
        className="rounded-lg hidden md:block w-full"
      />
      <Image
        src={"/mobile-placeholder.png"}
        width={560}
        height={620}
        alt="Placeholder mobile image"
        className="block rounded-lg md:hidden"
      />
      <div className="mb-30">
        <ViewProducts />
      </div>
    </div>
  );
}
