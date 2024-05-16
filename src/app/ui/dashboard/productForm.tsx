'use client'

import { Product } from "@/app/lib/interface";
import { useState } from "react";
import { useFormState } from "react-dom";
import { updateInventory } from "@/app/lib/queries";
import { State } from "@/app/lib/queries";



function handleSubmit() {
    
    // this.set.value
}

export default function Page({ product }: {product: Product}) {
    const initialState = { message: null, errors: {} };
    const updateProduct = updateInventory.bind(null, product.id);
    const [disabled, setdisabled] = useState(true);
    const [state, dispatch] = useFormState<State, FormData>(updateProduct, initialState);
    
    return (
        <form action={dispatch}>
            <input name="name" defaultValue={product.name} disabled={disabled}></input>
            {/* {state.errors?.name &&
            state.errors.name.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))} */}
            <input name="description" defaultValue={product.price} disabled={disabled} type="number"></input>
            <input name="price" defaultValue={product.quantity_available} disabled={disabled} type="number"></input>
            <textarea name="quantity" defaultValue={product.description}></textarea>
            <button type="submit">Edit Product</button>
        </form>
    )
}