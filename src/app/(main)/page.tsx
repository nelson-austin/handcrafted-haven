import { Lusitana } from "next/font/google";
import { Metadata } from "next";
import ProductGrid from "../ui/products/productGrid";

export const metadata: Metadata = {
  title: "Products",
};


const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function ProductPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || ''
  return (
    <div>
      <ProductGrid query={query}/>
    </div>
    
  );
}
