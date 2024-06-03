import { updateQuantity } from "@/app/lib/actions";
import { Quantity } from "@/app/lib/interface";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  console.log("Update")
  try {
    const { id, quantity_available } =
      await request.json();
    alert(id)
    var quantity: Quantity = {
      id: id,
      quantity_available: quantity_available,
    };

    await updateQuantity(quantity);

  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({ message: "Success" });
}
