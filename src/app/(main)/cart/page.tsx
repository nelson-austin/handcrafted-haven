"use client";

import { useEffect, useState } from "react";
import { Product } from "@/app/lib/interface";

interface CartItem extends Product {
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    // Retrieve the cart items from local storage and parse them
    const storedCartItems = JSON.parse(
      localStorage.getItem("cart-items") || "[]"
    );

    // Initialize a map for item quantities
    const itemMap: { [key: string]: CartItem } = {};

    // Loop through each item in the cart
    storedCartItems.forEach((item: Product) => {
      // If the item is already in the map, increment its quantity
      if (itemMap[item.id]) {
        itemMap[item.id].quantity += 1;
      } else {
        // Otherwise, add the item to the map with quantity 1
        itemMap[item.id] = { ...item, quantity: 1 };
      }
    });

    // Calculate the total cost
    const totalCost = Object.values(itemMap).reduce(
      (accumulator, currentItem) =>
        accumulator + currentItem.price * currentItem.quantity,
      0
    );

    // Set the cart items and total cost in state
    setCartItems(Object.values(itemMap));
    setTotalCost(totalCost);
  }, []);

  return (
    <section className="pt-[150px] pb-20">
      <h2 className="text-center  p-5 text-[33px] font-bold">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-[36px]">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col items-center">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center bg-blue-100 shadow-lg rounded-lg p-4 m-2 w-80"
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
            </div>
          ))}
          <div className="mt-4 p-4 bg-gray-200 rounded-lg w-full max-w-sm text-center">
            <h3 className="text-xl font-semibold">
              Total Cost: {`$${totalCost.toFixed(2)}`}
            </h3>
          </div>
        </div>
      )}
    </section>
  );
}
