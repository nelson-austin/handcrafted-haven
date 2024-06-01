import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import { User } from "@/app/lib/interface";
import { updateUser } from "@/app/lib/actions";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    const {
      id,
      name,
      email,
      oldPassword,
      password,
      business_name,
      image,
      image_id,
      is_seller,
    } = await request.json();

    const isValid = await compare(oldPassword, session!.user.password);

    if (isValid) {
      var user: User = {
        id: id,
        name: name,
        email: email,
        password: password === "" ? oldPassword : password,
        is_seller: is_seller,
        business_name: business_name ?? "",
        image: image,
        image_id: image_id,
      };

      const response = await updateUser(user);

      if (session !== null) session.user = user;

      return NextResponse.json({ message: "Success" });
    } else {
      return NextResponse.json({ message: "Invalid password" });
    }
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json({ message: "Error" });
}
