import Link from "next/link";
export default function SellerLoginButton() {
  return (
    <>
      <Link href={"/seller-login"}>
        <div className="flex items-center justify-center w-[405px] bg-green-900 cursor-pointer rounded-lg text-[30px] font-bold text-sky-100 p-4 md:w-[330px] md:hover:bg-green-700 ease-in duration-300 lg:w-[460px]">
          <button>Seller Log In</button>
        </div>
      </Link>
    </>
  );
}
