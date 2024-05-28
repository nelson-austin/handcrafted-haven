import React from "react";
import Image from "next/image";
import { Order, Product } from "@/app/lib/interface";

interface OrderHistory extends Product, Order {}

export default function OrderHistoryCard({
  name,
  image,
  price,
  order_date,
}: OrderHistory) {
  const formattedDate = order_date?.getDay()
    ? new Date(order_date).toLocaleDateString()
    : "N/A";

  return (
    <section className="rounded-xl justify-center ">
      <div className="flex w-[360px] md:w-[355px] lg:w-[450px] rounded-xl overflow-hidden shadow-xl mx-4 my-4 bg-blue-100">
        <Image
          src={image}
          width={150}
          height={250}
          alt="Product Image"
        />
        <div className="px-6 py-4">
          <h2 className="font-bold text-xl mb-2">{name}</h2>
          <p className="text-gray-700 text-base font-semibold">${price}</p>
          <p>Order Date: {formattedDate}</p>
        </div>
      </div>
    </section>
  );
}
