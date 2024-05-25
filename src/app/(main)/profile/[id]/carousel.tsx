'use client';

import Link from "next/link";
import { GridTileImage } from "./grid/tile";
import { Product, User } from "@/app/lib/interface";

export default function Carousel({ products } = { products: [] as Product[] }) {
  if (!products.length) return <div>No products found</div>;

  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {products.map((product, i) => (
          <li
            key={product.id}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[208px] flex-none md:w-1/3"
          >
            <Link
              href={`/product/${product.id}`}
              className="relative h-full w-full"
            >
              <GridTileImage
                alt={product.name}
                label={{
                  title: product.name,
                  amount: product.quantity_available.toString(),
                  description: product.description,
                  currencyCode: 'USD',
                }}
                src={`/products/${product.image}`}
                fill
                sizes="(min-width: 560px) 25vw, (min-width: 620px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
