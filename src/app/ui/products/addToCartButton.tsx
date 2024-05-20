"use client";

import { useDispatch } from "react-redux";
import { incrementItemQuantity } from "@/redux/features/cartCounterSlice";
import { Product } from "@/app/lib/interface";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Increment cart count in Redux state
    dispatch(incrementItemQuantity());

    // Retrieve the existing cart items from local storage and parse them
    const existingCartItems = JSON.parse(
      localStorage.getItem("cart-items") || "[]"
    );

    // Add the new product to the cart items
    const updatedCartItems = [...existingCartItems, product];

    // Save the updated cart items to local storage
    localStorage.setItem("cart-items", JSON.stringify(updatedCartItems));
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        className="bg-green-800 m-3 w-80 text-2xl rounded-lg p-3 flex justify-center items-center md:hover:bg-green-700 text-sky-100 md:w-[200px] lg:w-[270px]"
      >
        Add to Cart
      </button>
    </>
  );
}
