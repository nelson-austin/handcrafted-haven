"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCartItems } from "@/redux/features/cartCounterSlice";
import { Product } from "@/app/lib/interface";

interface CartItem extends Product {
  quantity: number;
}

export default function Header() {
  const dispatch = useDispatch();
  const cartCount: number = useSelector((state: RootState) => state.cart.totalItems);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Retrieve the existing cart items from local storage and parse them
      const existingCartItems = JSON.parse(
        localStorage.getItem("cart-items") || "[]"
      );

      // Initialize a map for item quantities
      const itemMap: { [key: string]: CartItem } = {};

      // Loop through each item in the cart
      existingCartItems.forEach((item: Product) => {
        if (itemMap[item.id]) {
          itemMap[item.id].quantity += 1;
        } else {
          itemMap[item.id] = { ...item, quantity: 1 };
        }
      });

      // Set the cart items in Redux state
      dispatch(setCartItems(Object.values(itemMap)));
    }
  }, [dispatch]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-25 bg-green-900 rounded-lg m-3 md:h-28">
      <div className="header-items flex items-center justify-between">
        <div className="flex flex-col">
          <Link href="/">
            <div className="flex items-center">
              <Image
                src="/logo-placeholder-image.png"
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
          <Link href="/cart" className="text-[23px] flex flex-col items-center">
            CART{" "}
            <span className="cart-badge text-orange-400 text-[33px]">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
