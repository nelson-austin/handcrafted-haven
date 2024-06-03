"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Product } from "@/app/lib/interface";
import {
  loadCartState,
  removeItemFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
} from "@/redux/features/cartSlice";

// Create new interface from the Product interface and add a new property "quantity"
export interface CartItem extends Product {
  quantity: number;
}

export default function CartPage() {
  const dispatch = useDispatch();

  // Load state from localStorage when the component mounts
  useEffect(() => {
    dispatch(loadCartState());
  }, [dispatch]);

  // Use the selector hook to access the cart items from the Redux store
  const cartItems = useSelector((state: any) => state.cart.items);

  const handleIncrement = (id: string) => {
    dispatch(incrementItemQuantity(id));
  };

  const handleDecrement = (id: string) => {
    dispatch(decrementItemQuantity(id));
  };

  const handleRemove = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  // Calculate the total cost of items in the cart
  const totalCost = cartItems.reduce(
    (accumulator: number, currentItem: CartItem) =>
      accumulator + currentItem.price * currentItem.quantity,
    0
  );

  return (
    <section className="pb-10">
      {/* Title */}
      {cartItems.length === 0 ? (
        <div className="text-center text-[36px]">
          <p>Your cart is empty.</p>
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
      ) : (
        <div>
          {/* Grid layout for displaying cart items */}
          <div className="flex flex-col items-center gap-5">
            <Link href={"/cart/order-history"}>
              <span className="flex mt-[30px] gap-1 items-center underline underline-offset-4 decoration-orange-300 md:text-[18px] md:hover:underline md:no-underline text-green-800 md:absolute top-[13%] right-[2%]">
                View Order History
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </span>
            </Link>{" "}
            <h2 className="text-center text-[33px] font-bold">Shopping Cart</h2>{" "}
          </div>
          <div className="flex flex-col items-center md:grid place-items-center grid-cols-2 lg:grid-cols-3">
            {cartItems.map((item: CartItem) => (
              <div
                key={item.id}
                className="flex flex-col m-3 items-center bg-blue-100 shadow-lg rounded-lg p-4 w-[363px] md:w-[365px] lg:w-[390px]"
              >
                <img
                  src={`${item.image}`}
                  alt={item.name}
                  className="w-[270px] rounded-lg"
                />
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-700">${item.price}</p>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-gray-800">Quantity: {item.quantity}</p>
                <div className="flex gap-3 justify-center mt-1">
                  {item.quantity_available === 0 ? (
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="hidden text-[15px] md:hover:bg-green-700 hover:text-slate-100 hover:scale-125 transition-all"
                    >
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
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="text-[15px] md:hover:bg-green-700 hover:text-slate-100 hover:scale-125 transition-all"
                    >
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
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => handleDecrement(item.id)}
                    className="text-[15px] md:hover:bg-red-600 hover:text-slate-100 hover:scale-125 transition-all"
                  >
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
                        d="M19.5 12h-15"
                      />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded mt-3"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl font-semibold mt-4">
              Total Cost: ${totalCost.toFixed(2)}
            </p>
            <Link href={"/cart/checkout"}>
              <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mt-3">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
