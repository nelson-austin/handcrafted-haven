import { createUser } from "@/app/lib/actions";
import { User } from "@/app/lib/interface";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password, is_seller, business_name, image, image_id } =
      await request.json();
    var user: User = {
      id: "",
      name: name,
      email: email,
      password: password,
      is_seller: is_seller,
      business_name: business_name ?? "",
      image: image ?? "",
      image_id: image_id ?? "",
    };

    const response = await createUser(user);

  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({ message: "Success" });
}
