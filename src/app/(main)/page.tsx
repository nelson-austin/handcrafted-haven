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
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  };
}) {
  const query = searchParams?.query || "";
  const category = searchParams?.category || "";
  const minPrice = searchParams?.minPrice || 0;
  const maxPrice = searchParams?.maxPrice || 5000;

  return (
    <div>
        {/* <ProductGrid
          query={query}
          category={category}
          minPrice={minPrice}
          maxPrice={maxPrice}
        /> */}
    </div>
    
  );
}
