import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header>
      <Link href={"/"} className="">
        <div className="flex items-center">
          <Image
            src={"/logo-placeholder-image.png"}
            width={100}
            height={100}
            alt="Logo Image"
          />
          <p className="text-sky-100 text-[26px] font-bold">
            Handcrafted Haven
          </p>
        </div>
      </Link>
    </header>
  );
}
