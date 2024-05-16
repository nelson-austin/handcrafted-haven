"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { incrementCartCount } from "@/redux/features/cartCounterSlice";

export default function AddToCartButton() {
  const dispatch = useDispatch();

  const handleCartCounter = () => {
    dispatch(incrementCartCount());
  };
  return (
    <>
      {/* <Link href={"/#"}> */}

      <button
        onClick={handleCartCounter}
        className="bg-green-800 m-3 w-80 text-2xl rounded-lg p-3 flex justify-center items-center md:hover:bg-green-700 text-sky-100 md:w-[200px] lg:w-[270px]"
      >
        Add to Cart
      </button>

      {/* </Link> */}
    </>
  );
}
