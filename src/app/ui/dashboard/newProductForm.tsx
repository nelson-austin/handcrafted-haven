'use client'

import { useRef, useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { newProduct } from "@/app/lib/queries";
import { State } from "@/app/lib/queries";
import UploadWidget from "@/app/ui/uploadWidget";

export default function Page({ id }: { id: string }) {

    const initialState = { message: null, errors: {} };
    const newInventoryItem = newProduct.bind(null, id);
    const [state, dispatch] = useFormState<State, FormData>(newInventoryItem, initialState);

    const [imageUrl, setImageUrl] = useState('');
    const imageRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        imageRef.current!.value = imageUrl;
    }, [imageUrl]);

    const [imageId, setImageId] = useState('');
    const imageIdRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        imageIdRef.current!.value = imageId;
    }, [imageId]);    

    return (
        <form action={dispatch} className="grid grid-cols-[1fr_2fr]">
            <UploadWidget imageId={imageId} setImageId={setImageId} imageUrl={imageUrl} setImageUrl={setImageUrl} />
            <input ref={imageIdRef} id="imageId" name="imageId" type="hidden"></input>
            <input ref={imageRef} id="image" name="image" type="hidden"></input>
            
            <div>
                <div className="block py-3 grid grid-cols-[1fr_4fr]">
                    <label htmlFor="name" className="text-[1.2em]">Product name</label>
                    <input id="name" name="name" autoFocus className="border border-solid border-[gray] py-1"></input>
                </div>
                <div className="block py-3 grid grid-cols-[1fr_4fr]">
                    <label htmlFor="price" className="text-[1.2em]">Price</label>
                    <input id="price" name="price" type="number" step='any' className="border border-solid border-[gray] py-1"></input>
                </div>
                <div className="block py-3 grid grid-cols-[1fr_4fr]">
                    <label htmlFor="quantity" className="text-[1.2em]">Quantity</label>
                    <input id="quantity" name="quantity" type="number" className="border border-solid border-[gray] py-1"></input>
                </div>
                <div className="block py-3 grid grid-cols-[1fr_4fr]">
                    <label htmlFor="description" className="text-[1.2em]">Description</label>
                    <textarea id="description" name="description" className="border border-solid border-[gray] py-1"></textarea>
                </div>

                <button type="submit" className="text-[1.2em] text-[white] bg-green-900 hover:bg-green-400 float-right p-2">Create Product</button>
            </div>
        </form>
    )
}