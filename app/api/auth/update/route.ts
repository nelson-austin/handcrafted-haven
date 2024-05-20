import { NextResponse } from "next/server";
import { createUser, updateUser } from "../../../lib/actions";
import { User } from "../../../lib/definitions";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { compare } from "bcrypt";

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

      console.log(user);
      const response = await updateUser(user);

      console.log(response);

      return NextResponse.json({ message: "Success" });
    } else {
      return NextResponse.json({ message: "Invalid password" });
    }
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json({ message: "Error" });;
}
