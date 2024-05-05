import React from 'react'
import Link from "next/link";

export default function ProductCard(props) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-4 my-4">
      <img className="w-full" src={props.cardImage} alt="Product Image" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Product Name</div>
        <p className="text-gray-700 text-base">
          {props.description}
        </p>
        <p className="text-gray-700 text-base font-semibold">{props.price}</p>
      </div>
      <div className="bg-green-800 my-3 text-2xl rounded-lg p-3 flex justify-center items-center md:hover:bg-green-700 text-sky-100">
        <Link href={"/dashboard/products/addcart"}>
          <button className="">Add to Cart</button>
        </Link>
      </div>
    </div>

  )
}