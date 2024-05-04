import Image from "next/image";
export default function HandCraftedLogo() {
  return (
    <div className="flex items-center">
      <Image
        src={"/logo-placeholder-image.png"}
        width={100}
        height={100}
        alt="Logo Image"
      />
      <p className="text-sky-100 text-[26px] font-bold">Handcrafted Haven</p>
    </div>
  );
}
