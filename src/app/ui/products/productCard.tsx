import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CardProps } from "@/app/lib/interface";
import AddToCartButton from "./addToCartButton";

export default function ProductCard({
  name,
  cardImage,
  price,
  description,
}: CardProps) {
  const imgPath = `/products/${cardImage}`;
  return (
    <div className="flex flex-col rounded-xl items-center justify-center p-3 bg-blue-100">
      <div className="max-w-sm rounded-xl overflow-hidden shadow-lg mx-4 my-4">
        <Image
          src={imgPath}
          width={150}
          height={250}
          alt="Product Image"
          className="w-[330px] m-auto rounded-xl md:w-[200px]"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{description}</p>
          <p className="text-gray-700 text-base font-semibold">${price}</p>
        </div>
        <AddToCartButton />
      </div>
    </div>
  );
}
