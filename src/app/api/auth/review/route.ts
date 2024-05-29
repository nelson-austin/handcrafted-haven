import { createReview } from "@/app/lib/actions";
import { Review } from "@/app/lib/interface";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { product_id, user_id, comment, rating } =
      await request.json();
    var review: Review = {
      id: "",
      product_id: product_id,
      user_id: user_id,
      rating: rating,
      comment: comment,
      date: new Date(),
      name: "", 
    };

    const response = await createReview(review);

  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({ message: "Success" });
}
