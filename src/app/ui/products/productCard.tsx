import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/lib/interface";
import AddToCartButton from "./addToCartButton";

export default function ProductCard({
  id,
  name,
  image_id,
  image,
  price,
  description,
  user_id,
  quantity_available,
  sold_out,
}: Product) {
  const productPage = `/product/${id}`

  return (
    <div className="flex flex-col rounded-xl items-center justify-center p-3 bg-blue-100">
      <div className="max-w-sm rounded-xl overflow-hidden shadow-lg mx-4 my-4">

        <Link href={productPage}>
          <Image
            src={image}
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
        </Link>
        
        <AddToCartButton
          product={{
            id,
            name,
            image_id,
            image,
            price,
            description,
            user_id,
            quantity_available,
            sold_out,
          }}
        />
      </div>
    </div>
  );
}
