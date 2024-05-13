import { fetchProductById } from "@/app/lib/queries";
import ProductForm from "@/app/ui/dashboard/productForm"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Update Product',
};

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const product = await fetchProductById(id);

    return (
        <></>
        // <p>{product.name}</p>
        // <ProductForm  />
    );
}