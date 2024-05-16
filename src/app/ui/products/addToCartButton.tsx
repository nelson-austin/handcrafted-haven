import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="shrink-0 bg-green-900 rounded-lg md:h-28">
      <div className="header-items flex items-center justify-between">
        <div className="flex flex-col">
          <Link href={"/"}>
            <div className="flex items-center">
              <Image
                src={"/logo-placeholder-image.png"}
                width={100}
                height={100}
                alt="Logo Image"
              />
              <p className="text-sky-100 text-[26px] font-bold leading-none">
                Handcrafted{" "}
                <span className="text-[51px] md:text-[26px]">Haven</span>
              </p>
            </div>
          </Link>
        </div>

        <div className="text-sky-400 font-semibold leading-none mr-4 md:ml-[270px] md:hover:text-sky-100 lg:ml-[900px]">
          <Link
            href={"/cart"}
            className="text-[23px] flex flex-col items-center"
          >
            CART{" "}
            <span className="cart-badge text-orange-400 text-[23px]">00</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default function AddToCartButton() {
  return (
    <>
      <div className="bg-green-800 my-3 text-2xl rounded-lg p-3 flex justify-center items-center md:hover:bg-green-700 text-sky-100">
        <Link href={"/dashboard/products/addcart"}>
          <button className="">Add to Cart</button>
        </Link>
      </div>
    </>
  );
}
