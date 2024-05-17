import { fetchProductById } from "@/app/lib/data";
import ProductForm from "@/app/ui/dashboard/productForm"
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: 'Update Product',
};

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const product = await fetchProductById(id);
    
    if (!product) {
        notFound();
    }
    
    return (<ProductForm  product={product}/>);
}