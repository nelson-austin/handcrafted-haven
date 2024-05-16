"use client";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function Header() {
  const cartCount = useSelector((state: any) => state.cart.cartCount);
  return (
    <header className={`h-25 bg-green-900 rounded-lg m-3 md:h-28 `}>
      <div className="header-items flex items-center justify-between ">
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
            <span className="cart-badge text-orange-400 text-[33px]">
              {`${cartCount}`}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
