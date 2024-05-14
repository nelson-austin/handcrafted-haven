import React from 'react'
import Link from "next/link";
import Image from 'next/image';
import { CardProps } from '@/app/lib/interface';

export default function ProductCard({ name, price, description }: CardProps) {
  return (
    <div className='flex flex-col items-center justify-center p-4 bg-blue-50'>
      <div className="max-w-sm rounded overflow-hidden shadow-lg mx-4 my-4">
        <Image
        src={"/product-placeholder-image.png"}
        width={150}
        height={250}
        alt="Product Image"
        className="w-full"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">
            {description}
          </p>
          <p className="text-gray-700 text-base font-semibold">${price}</p>
        </div>
        <div className="bg-green-800 my-3 text-2xl rounded-lg p-3 flex justify-center items-center md:hover:bg-green-700 text-sky-100">
          <Link href={"/dashboard/products/addcart"}>
            <button className="">Add to Cart</button>
          </Link>
        </div>
      </div>
    </div>

  )
}