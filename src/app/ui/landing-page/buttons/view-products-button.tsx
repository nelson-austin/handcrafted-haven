import Link from "next/link";

export default function ViewProductsButton() {
  return (
    <>
      <Link href={"/register"}>
        <div className="flex items-center text-sky-100 font-black justify-center w-[350px] p-5 mt-10 text-[22px] bg-[#496245] rounded-lg text-gray-900 text-center md:pt-5 text-2xl md:w-[200px] md:hover:bg-[#67785C]">
          <button>View Products</button>
        </div>
      </Link>
    </>
  );
}
