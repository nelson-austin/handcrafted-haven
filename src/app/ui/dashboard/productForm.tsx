'use client'

import { Product } from "@/app/lib/interface";
import { useState } from "react";
import { useFormState } from "react-dom";
import { updateInventory } from "@/app/lib/queries";
import { State } from "@/app/lib/queries";

export default function Page({ product }: {product: Product}) {

    const initialState = { message: null, errors: {} };
    const updateProduct = updateInventory.bind(null, product.id);
    const [state, dispatch] = useFormState<State, FormData>(updateProduct, initialState);

    const [disabled, setDisabled] = useState(true);
    const [time, setTime] = useState(Date.now());

    function allowEdit() {
      setDisabled(false);
    }
    function disableEdit() {
      setDisabled(true);
      setTime(Date.now());
    }
    
    return (
        <form action={dispatch} key={time}>
            <input name="name" defaultValue={product.name} disabled={disabled}></input>
            <input name="price" defaultValue={product.price} disabled={disabled} type="number"></input>
            <input name="quantity" defaultValue={product.quantity_available} disabled={disabled} type="number"></input>
            <textarea name="description" defaultValue={product.description} disabled={disabled}></textarea>
            {disabled
              ? <button type="button" onClick={allowEdit}>Edit Product</button>
              : <><button type="reset" onClick={disableEdit}>Cancel</button>
                <button type="submit">Save Product</button></>}
        </form>
    )
}