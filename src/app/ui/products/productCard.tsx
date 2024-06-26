import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/lib/interface";
import AddToCartButton from "./addToCartButton";

export default function ProductCard({
  id,
  product_id,
  name,
  image_id,
  image,
  price,
  description,
  user_id,
  quantity_available,
}: Product) {
  const productPage = `/product/${product_id}`;

  if (quantity_available === 0) {
    return (
      <section className="flex flex-col rounded-xl items-center justify-center p-3 bg-blue-100">
        <div
          className="max-w-sm rounded-xl overflow-hidden shadow-lg mx-4 my-4"
          style={{ opacity: 0.5 }}
        >
          <Image
            src={image}
            width={150}
            height={250}
            alt="Product Image"
            className="w-[330px] m-auto rounded-xl md:w-[200px]"
          />
          <div className="px-6 py-4">
            <h2 className="font-bold text-xl mb-2 line-through">{name}</h2>
            <p className="text-gray-700 text-base line-through">
              {description}
            </p>
            <p className="text-gray-700 text-base font-semibold line-through">
              ${price}
            </p>
          </div>

          <div className="bg-red-800 m-3 w-80 text-2xl rounded-lg p-3 flex justify-center items-center  text-sky-100 md:w-[200px] lg:w-[270px]">
            Sold Out
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col rounded-xl items-center justify-center p-3 bg-blue-100">
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
            <h2 className="font-bold text-xl mb-2">{name}</h2>
            <p className="text-gray-700 text-base">{description}</p>
            <p className="text-gray-700 text-base font-semibold">${price}</p>
          </div>
        </Link>
        
        <AddToCartButton
          product={{
            id,
            name,
            product_id,
            image_id,
            image,
            price,
            description,
            user_id,
            quantity_available,
          }}
        />
      </div>
    </section>
  );
}
