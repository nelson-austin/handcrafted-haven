"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "@/app/lib/interface";
import {
  removeItemFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
} from "@/redux/features/cartSlice";

interface CartItem extends Product {
  quantity: number;
}

export default function CartPage() {
  const dispatch = useDispatch();
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

  const totalCost = cartItems.reduce(
    (accumulator: number, currentItem: CartItem) =>
      accumulator + currentItem.price * currentItem.quantity,
    0
  );

  return (
    <section className="pt-[150px] pb-20">
      <h2 className="text-center text-[33px] font-bold">Shopping Cart</h2>
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
          <div className="flex flex-col items-center md:grid place-items-center grid-cols-2 lg:grid-cols-3">
            {cartItems.map((item: CartItem) => (
              <div
                key={item.id}
                className="flex flex-col m-3 items-center bg-blue-100 shadow-lg rounded-lg p-4 w-[363px] md:w-[357px] lg:w-[390px]"
              >
                <img
                  src={`/products/${item.image}`}
                  alt={item.name}
                  className="w-40 h-40 object-cover"
                />
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-700">${item.price}</p>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-gray-800">Quantity: {item.quantity}</p>
                <div className="flex gap-3 justify-center mt-1">
                  <button
                    onClick={() => handleIncrement(item.id)}
                    className="text-[15px] md:hover:bg-green-700 hover:text-sky-100 font-black mb-1 bg-white rounded-[50%] p-4"
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
                  <button
                    onClick={() => handleDecrement(item.id)}
                    className="text-[15px] md:hover:bg-green-700 hover:text-sky-100 font-black mb-1 bg-white rounded-[50%] p-4"
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
                        d="M5 12h14"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-[15px] md:hover:bg-green-700 hover:text-red-900 font-black mb-1 bg-white rounded-[50%] p-4"
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center mt-10 m-auto p-4 bg-green-900 text-sky-100 rounded-lg w-[360px] md:mr-[20px]">
              <h3 className="text-xl font-semibold">
                Total Cost: {`$${totalCost.toFixed(2)}`}
              </h3>
              <Link href={"/checkout"}>
                <p className="text-xl font-semibold md:hover:bg-sky-100 md:p-3 rounded-lg hover:underline md:hover:text-green-900">
                  Checkout
                </p>
              </Link>
            </div>
            <div className="text-[36px]">
              <Link href={"/"}>
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
                  <p>Continue Shopping</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
