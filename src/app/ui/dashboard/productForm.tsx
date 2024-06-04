'use client'

import { useRef, useState, useEffect } from "react";
import { Category, Product } from "@/app/lib/interface";
import { useFormState } from "react-dom";
import { updateInventory } from "@/app/lib/queries";
import { State } from "@/app/lib/queries";
import UploadWidget from "@/app/ui/uploadWidget";

export default function Page({ product, categories }: {product: Product, categories: Category[]}) {

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

    var heightLimit = 100;
    function resize(e: any) {
      const textarea = e.target;
      textarea.style.height = ""; /* Reset the height*/
      textarea.style.height = Math.min(textarea.scrollHeight, heightLimit) + "px";
    }

    const textarea = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (textarea.current) {
        textarea.current.style.height = "";
        textarea.current.style.height = Math.min(textarea.current.scrollHeight, heightLimit) + "px";
      }
    }, [time]);

    const [imageUrl, setImageUrl] = useState(product.image);
    const imageRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      imageRef.current!.value = imageUrl;
    }, [imageUrl]);

    const [imageId, setImageId] = useState(product.image_id);
    const imageIdRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        imageIdRef.current!.value = imageId;
    }, [imageId]);

    return (
        <form action={dispatch} className="grid grid-cols-[3fr_5fr]">
          <UploadWidget imageId={imageId} setImageId={setImageId} imageUrl={imageUrl} setImageUrl={setImageUrl}  />
           
          <input ref={imageIdRef} id="imageId" name="imageId" type="hidden"></input>
          <input ref={imageRef} id="image" name="image" type="hidden"></input>
          
          <div key={time}>
            <div className="block py-3 grid grid-cols-[1fr_3fr]">
              <label htmlFor="name" className="text-[1.2em]">Product name</label>
              <input name="name" defaultValue={product.name} disabled={disabled} className="disabled:bg-slate-200 enabled:border enabled:border-solid enabled:border-[gray] p-2"></input>
            </div>
            <div className="block py-3 grid grid-cols-[1fr_3fr]">
              <label htmlFor="price" className="text-[1.2em]">Price</label>
              <input name="price" defaultValue={product.price} disabled={disabled} type="number" className="disabled:bg-slate-200 enabled:border enabled:border-solid enabled:border-[gray] p-2"></input>
            </div>
            <div className="block py-3 grid grid-cols-[1fr_3fr]">
              <label htmlFor="quantity" className="text-[1.2em]">Quantity</label>
              <input name="quantity" defaultValue={product.quantity_available} disabled={disabled} type="number" className="disabled:bg-slate-200 enabled:border enabled:border-solid enabled:border-[gray] p-2"></input>
            </div>
            <div className="block py-3 grid grid-cols-[1fr_3fr]">
              <label htmlFor="description" className="text-[1.2em]">Description</label>
              <textarea name="description" ref={textarea} onChange={ resize } rows={1} maxLength={250} defaultValue={product.description} disabled={disabled} className="disabled:bg-slate-200 enabled:border enabled:border-solid enabled:border-[gray] p-2 resize-none overflow-hidden"></textarea>
            </div>
            <div className="block py-3 grid grid-cols-[1fr_3fr]">
              <label htmlFor="category" className="text-[1.2em]">Product Category</label>
              <select id="category" name="category" disabled={disabled} className="disabled:bg-slate-200 enabled:border enabled:border-solid enabled:border-[gray] p-2 disabled:text-black">
                <option value={product.category_id}>{product.category_name}</option>
                {categories.filter(cat => cat.id !== product.category_id).map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            {disabled
              ? <button type="button" onClick={allowEdit} className="text-[1.2em] text-[white] bg-green-900 hover:bg-green-400 float-right p-2">Edit Product</button>
              : <><button type="submit" className="text-[1.2em] text-[white] bg-green-900 hover:bg-green-400 float-right p-2">Save Product</button>
                <button type="reset" onClick={disableEdit} className="text-[1.2em] text-green-900 float-right p-2">Cancel</button></>}
          </div>
        </form>
    )
}