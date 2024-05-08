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
    productName: "Chest",
    price: "$345.00",
    description: "Lorem Ipsum dolo mite",
  },
  {
    cardId: uuid,
    cardImage: "/product-placeholder-image.png",
    productName: "Rack",
    price: "$375.00",
    description: "Lorem Ipsum dolo mite",
  },
  {
    cardId: uuid,
    cardImage: "/product-placeholder-image.png",
    productName: "Wooden Spoon",
    price: "$15.00",
    description: "Lorem Ipsum dolo mite",
  },
  {
    cardId: uuid,
    cardImage: "/product-placeholder-image.png",
    productName: "Wooden Spoon",
    price: "$15.00",
    description: "Lorem Ipsum dolo mite",
  },
  {
    cardId: uuid,
    cardImage: "/product-placeholder-image.png",
    productName: "Wooden Spoon",
    price: "$15.00",
    description: "Lorem Ipsum dolo mite",
  },
];

const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function ProductPage() {
  return (
    <>
      <div>
        <h2
          className={`${lusitana.className} flex  items-center justify-center rounded-lg text-2xl p-3 md:text-3xl bg-green-800 text-sky-100 md:justify-start`}
        >
          Product Page
        </h2>
      </div>
      <section className="grid grid-cols-1 mt-5 gap-5 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
        {cartCards.map((card) => {
          return (
            <div
              key={card.cardId}
              className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg"
            >
              <Image
                src={card.cardImage}
                width={150}
                height={200}
                alt="Cart Card Image"
              />
              <h2>{`Product Name: ${card.productName}`}</h2>
              <p>{`Price: ${card.price}`}</p>
              <p>{`Description: ${card.description}`}</p>
              <div className="bg-green-800 my-3 text-2xl rounded-lg p-3 flex justify-center items-center md:hover:bg-green-700 text-sky-100">
                <Link href={"/dashboard/products/addcart"}>
                  <button className="">Add to Cart</button>
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
