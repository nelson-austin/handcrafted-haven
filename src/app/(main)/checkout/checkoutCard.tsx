"use client";

import React from "react";
import { useSelector } from "react-redux";
import { CartItem } from "../cart/page";
import Link from "next/link";

export default function CheckoutCard() {
  const cartItems = useSelector((state: any) => state.cart.items);

  return (
    <>
      <div className="flex flex-col items-center md:">
        {cartItems.map((item: CartItem) => (
          <div
            key={item.id}
            className="flex flex-col m-3 items-center bg-blue-100 shadow-lg rounded-lg p-4 w-[363px] md:w-[265px] lg:w-[390px]"
          >
            {/* Display product image */}
            <img
              src={`${item.image}`}
              alt={item.name}
              className="w-[150px] rounded-lg"
            />
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-700">${item.price}</p>
            <p className="text-gray-800">Quantity: {item.quantity}</p>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
      <Link href={"/cart"}>
        <div className="flex items-center justify-center md:justify-end gap-1 pt-4 text-gray-400 md:mr-5 md:hover:text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
          <p className="text-[27px]">Back to cart</p>
        </div>
      </Link>
    </>
  );
}
