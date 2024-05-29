"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "@/app/lib/interface";
import { useState } from "react";
import { clearCart } from "@/redux/features/cartSlice";

interface CartItem extends Product {
  quantity: number;
}

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);

  const totalCost = cartItems.reduce(
    (accumulator: number, currentItem: CartItem) =>
      accumulator + currentItem.price * currentItem.quantity,
    0
  );

  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);
  const [emptyCart, setEmptyCart] = useState(false);

  const handleCheckout = () => {
    dispatch(clearCart());
    setIsCheckoutComplete(true);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setEmptyCart(true);
  };

  if (emptyCart) {
    return (
      <section className="pb-20">
        <div className="text-center text-[36px]">
          <p>Your cart is empty!</p>
          <Link href={"/"}>
            <div className="flex items-center justify-center gap-3 pt-5 text-gray-400 md:hover:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
              <p>Continue Shopping</p>
            </div>
          </Link>
        </div>
      </section>
    );
  }

  if (isCheckoutComplete) {
    return (
      <section className="pb-20">
        <div className="text-center text-[36px]">
          <p>Thank you for your purchase!</p>
          <Link href={"/"}>
            <div className="flex items-center justify-center gap-3 pt-5 text-gray-400 md:hover:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
              <p>Continue Shopping</p>
            </div>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-10">
      <h2 className="text-center text-[33px] font-bold">Checkout</h2>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col md:grid grid-cols-2 lg:grid-cols-3">
            {cartItems.map((item: CartItem) => (
              <div
                key={item.id}
                className="flex flex-col w-[360px] m-3 items-center bg-blue-100 shadow-lg rounded-lg p-4"
              >
                <img
                  src={`${item.image}`}
                  alt={item.name}
                  className="w-[270px] rounded-lg"
                />
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-700">${item.price}</p>
                <p className="text-gray-800">Quantity: {item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col w-[360px] gap-5 m-auto justify-between items-center mt-5 p-4 bg-green-900 text-sky-100 rounded-lg md:flex-row md:w-[97%]">
            <h3 className="text-xl font-semibold">
              Total Cost: ${totalCost.toFixed(2)}
            </h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCheckout}
                className="text-xl font-semibold bg-sky-100 text-green-900 p-3 rounded-lg hover:underline"
              >
                Complete Purchase
              </button>
              <button
                onClick={handleClearCart}
                className="text-xl font-semibold bg-sky-100 text-green-900 p-3 rounded-lg hover:underline"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
        <div className="text-[36px] flex flex-col md:flex-row md:items-center md:gap-3 ">
          <Link href={"/cart"}>
            <div className="flex items-center justify-center gap-1 pt-4 text-gray-400 md:hover:text-gray-500">
              {/* SVG icon for the back to cart link */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
              <p className="">Back to cart</p>
            </div>
          </Link>
          <Link href={"/"}>
            <div className="flex items-center justify-center gap-1 pt-4 text-gray-400 md:hover:text-gray-600 md:justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
              <p>Continue Shopping</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
