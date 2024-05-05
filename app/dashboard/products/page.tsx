import { Lusitana } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
const uuid = uuidv4();
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

const cartCards = [
  {
    cardId: uuid,
    cardImage: "/product-placeholder-image.png",
    price: "$345.00",
    description: "Lorem Ipsum dolo mite",
  },
];

const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function ProductPage() {
  return (
    <section className="flex flex-col">
      <h2
        className={`${lusitana.className} text-2xl pb-5 text-center md:text-3xl md:text-left`}
      >
        Product Page
      </h2>
      {cartCards.map((card) => {
        return (
          <div
            key={card.cardId}
            className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg"
          >
            <Image
              src={card.cardImage}
              width={150}
              height={250}
              alt="Cart Card Image"
            />
            <p>{`Price: ${card.price}`}</p>
            <p>{`Description: ${card.description}`}</p>
          </div>
        );
      })}
      <div className="bg-green-800 my-3 text-2xl rounded-lg p-3 flex justify-center items-center md:hover:bg-green-700 text-sky-100">
        <Link href={"/dashboard/products/addcart"}>
          <button className="">Add to Cart</button>
        </Link>
      </div>
    </section>
  );
}
