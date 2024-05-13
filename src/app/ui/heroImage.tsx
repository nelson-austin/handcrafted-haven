import Image from "next/image";
export default function HeroImage() {
  return (
    <div className="">
      <Image
        src={"/desktop-hero.png"}
        width={1100}
        height={760}
        alt="Placeholder desktop image"
        className="rounded-lg h-[483px] gap-0 object-cover hidden md:block"
      />
      <Image
        src={"/mobile-placeholder.png"}
        width={560}
        height={620}
        alt="Placeholder mobile image"
        className="block rounded-lg md:hidden"
      />
    </div>
  );
}
