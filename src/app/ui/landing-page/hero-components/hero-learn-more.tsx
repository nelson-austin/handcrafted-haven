import Image from "next/image";
import LearnMore from "./learn-more";

export default function HeroLearnMore() {
  return (
    <div className="">
      <Image
        src={"/desktop-hero.png"}
        width={1000}
        height={560}
        alt="Placeholder desktop image"
        className="rounded-lg hidden md:block w-[97%] m-auto lg:w-[97.5%]"
      />
      <Image
        src={"/mobile-placeholder.png"}
        width={560}
        height={620}
        alt="Placeholder mobile image"
        className="block w-[94%] m-auto rounded-lg md:hidden"
      />
      <div className="flex justify-center">
        <LearnMore />
      </div>
    </div>
  );
}
