"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/features/cartSlice";

interface Item {
  id: string;
  user_id: string;
  product_id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  quantity_available: number;
  image_id: string | null;
  quantity: number;
}

export default function CheckForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [orderTotal, setOrderTotal] = useState<number>(0);
  var errorMessage = null;


  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const data = JSON.parse(cart);
      setItems(data.items);

      // Calculate order total
      const total = data.items.reduce((acc: number, item: Item) => {
        const price = parseFloat(item.price);
        return acc + price * item.quantity;
      }, 0);
      setOrderTotal(total);

    }
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    errorMessage = null;
    // Update the product quantities in the database
    items.map(async (item) => {
      const response = await fetch("/api/auth/quantity", {
        method: "PUT",
        body: JSON.stringify({
          id: item.product_id || item.id,
          quantity_available: item.quantity_available - item.quantity,
        }),
      });
      if (response.ok) {
      } else {
        errorMessage = response.statusText;
      }
    });

    dispatch(clearCart());
    localStorage.setItem("cart", "");
    router.push("/thankyou");
    router.refresh();
  }
  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="border p-4 ">
        <legend className="text-xl font-semibold text-gray-800">
          Shipping
        </legend>
        <div className="checkout__name">
          <label className="block">
            First Name
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              name="fname"
              required
            />
          </label>
          <label className="block">
            Last Name
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              name="lname"
              required
            />
          </label>
        </div>
        <div className="checkout__address">
          <label className="block">
            Street
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              name="street"
              required
            />
          </label>
          <label className="block">
            City
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              name="city"
              required
            />
          </label>

          <label className="block">
            State
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              name="state"
              required
            />
          </label>

          <label className="block">
            Zip
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              name="zip"
              id="zip"
              required
            />
          </label>
        </div>
      </fieldset>
      <fieldset className="border p-4">
        <legend className="text-xl font-semibold text-gray-800">Payment</legend>
        <label className="block">
          Card number
          <input
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
            name="cardNumber"
            pattern="[0-9]{7,}"
            required
          />
        </label>

        <label className="block">
          Expiration
          <input
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
            name="expiration"
            pattern="[0-9]{1,2}\/[0-9]{1,2}"
            required
          />
        </label>

        <label className="block">
          Security Code
          <input
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
            name="code"
            pattern="[0-9]{3,}"
            required
          />
        </label>
      </fieldset>
      <fieldset className="border p-4">
        <legend className="text-xl font-semibold text-gray-800">
          Order Summary
        </legend>
        <ul>
          <li>
            <label className="block text-xl">
              <b>All Items :</b>
            </label>
            <p className="cartTotal" id="cartTotal"></p>
            <ul>
              {items.map((item) => {
                const price = parseFloat(item.price); // Convert price to a number
                const totalPrice = price * item.quantity;
                return (
                  <li key={item.id}>
                    <p>
                      {item.quantity}x {item.name} - ${item.price}
                    </p>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <label className="block text-xl">
              <b>Order Total:</b>
            </label>
            <p className="text-xl">${orderTotal.toFixed(2)}</p>
          </li>
        </ul>
      </fieldset>
      <div className="flex justify-center">
        <button className="bg-green-800 m-3 ml-0 mr-0 text-2xl rounded-lg p-2 flex justify-center items-center md:hover:bg-green-700 text-sky-100 w-[200px] lg:w-[270px]">
          Checkout
        </button>
      </div>
    </form>
  );
}
