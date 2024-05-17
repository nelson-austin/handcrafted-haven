'use client'

import { useFormState } from "react-dom";
import { newProduct } from "@/app/lib/queries";
import { State } from "@/app/lib/queries";

export default function Page() {

    const initialState = { message: null, errors: {} };
    // const [state, dispatch] = useFormState<State, FormData>(newProduct, initialState);
    
    return (
        <form 
        // action={dispatch}
        >
            <label htmlFor="name">Product name</label>
            <input id="name" name="name"></input>
            <label htmlFor="price">Price</label>
            <input id="price" name="price" type="number"></input>
            <label htmlFor="quantity">Quantity</label>
            <input id="quantity" name="quantity" type="number"></input>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description"></textarea>
            <label htmlFor="image">Image</label>
            <input id="image" name="image" type="file"></input> 
            <button type="submit">Create Product</button>
        </form>
    )
}