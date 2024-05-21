import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { compare } from "bcrypt";
import { User } from "@/app/lib/interface";
import { updateUser } from "@/app/lib/actions";
import { authOptions } from "@/app/lib/authOptions";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { id, name, email, oldPassword, password, business_name } =
      await request.json();

    const isValid = await compare(oldPassword, session!.user.password);

    if (isValid) {
      var user: User = {
        id: id,
        name: name,
        email: email,
        password: password === "" ? oldPassword : password,
        is_seller: session!.user.is_seller,
        business_name: session!.user.is_seller
          ? business_name
          : session!.user.business_name,
      };

      const response = await updateUser(user);

      return NextResponse.json({ message: "Success" });
    } else {
      return NextResponse.json({ message: "Invalid password" });
    }
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json({ message: "Error" });;
}
