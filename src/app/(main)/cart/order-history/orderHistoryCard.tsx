import React from "react";
import Image from "next/image";
import { Order, Product } from "@/app/lib/interface";

interface OrderHistory extends Product, Order {}

export default function OrderHistoryCard({
  description,
  name,
  image,
  price,
}: OrderHistory) {
  return (
    <section className="flex flex-col rounded-xl items-center justify-center p-3 bg-blue-100">
      <div className="max-w-sm rounded-xl overflow-hidden shadow-lg mx-4 my-4">
        <Image
          src={image}
          width={150}
          height={250}
          alt="Product Image"
          className="w-[330px] m-auto rounded-xl md:w-[200px]"
        />
        <div className="px-6 py-4">
          <h2 className="font-bold text-xl mb-2">{name}</h2>
          <p className="text-gray-700 text-base">{description}</p>
          <p className="text-gray-700 text-base font-semibold">${price}</p>
        </div>
      </div>
    </section>
  );
}
