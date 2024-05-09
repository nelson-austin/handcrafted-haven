import Link from "next/link";

export default function BuyerLoginButton() {
  return (
    <>
      <Link href={"/buyer-login"}>
        <div className="flex flex-col items-center justify-center w-[405px] mt-3 bg-green-900 cursor-pointer rounded-lg text-[30px] font-bold text-sky-100 p-4 md:w-[325px] md:hover:bg-green-700 ease-in duration-300 lg:w-[465px]">
          <button>Buyer Log In</button>
        </div>
      </Link>
    </>
  );
}
