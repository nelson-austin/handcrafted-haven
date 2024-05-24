import { notFound } from "next/navigation";
import { fetchProductById, fetchReviewsByProductById } from "@/app/lib/data";
import Image from "next/image";
import AddToCartButton from "@/app/ui/products/addToCartButton";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const product = await fetchProductById(id);
  const reviews = await fetchReviewsByProductById(id);
  console.log(reviews);
  const star = "★";

  if (!product) {
    notFound();
  }
  const imgPath = `/products/${product.image}`;

  return (
    <div className="pt-[140px] pl-3 pr-3 overflow-y-clip md:pl-[10%] md:pr-[10%]">
      <div className="flex flex-col rounded-xl items-center justify-center p-3 bg-blue-100">
        <Image
          src={imgPath}
          width={560}
          height={620}
          className="w-[330px] rounded-xl"
          alt={product.description}
        />
        <h1 className="font-bold text-[30px] mb-2">{product.name}</h1>
        <p className="text-gray-700 text-base">{product.description}</p>
        <p className="text-gray-700 text-base">
          Quantity Aviable: {product.quantity_available}
        </p>
        <p className="text-gray-700 text-xl font-semibold">${product.price}</p>
        <AddToCartButton product={product} />
      </div>
      <div className="flex flex-col rounded-xl items-left justify-left p-3 bg-blue-100 mt-5">
        <h1 className="font-bold mb-2 text-[25px] text-center mt-5">Reviews</h1>
        {reviews.map((review) => {
          const stars = star.repeat(review.rating);

          if (review.date == null) {
            review.date = "01-01-2024";
          }
          return (
            <div key={review.id}>
              <div className="block bg-gray-50  rounded-xl overflow-hidden shadow-lg mx-4 my-4 p-5 md:min-w-[35rem]">
                <p className="font-bold">
                  {review.name} - {review.date}
                </p>
                <p>{review.comment}</p>
                <p className="font-bold">Rating: {stars}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
