import { Lusitana } from "next/font/google";
import { Metadata } from "next";
import ProductGrid from "../ui/products/productGrid";
import CollapsibleMenu from "@/app/ui/products/sidebar"
import { fetchCategories } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Products",
};

const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function ProductPage({
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

  const categories = await fetchCategories()

  return (
    <div>
      <CollapsibleMenu categories={categories}/>
        <ProductGrid
          query={query}
          category={category}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
    </div>
  );
}
