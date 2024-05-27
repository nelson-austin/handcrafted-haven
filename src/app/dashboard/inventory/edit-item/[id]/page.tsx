import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { fetchProductById } from "@/app/lib/data";
import ProductForm from "@/app/ui/dashboard/productForm"
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Update Product',
};

export default async function Page({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    const id = params.id;
    const product = await fetchProductById(id);
    
    if (!product) {
        notFound();
    }
    if (product.user_id != session?.user.id) {
        redirect(`/product/${id}`);
    }
    
    return (<ProductForm  product={product}/>);
}