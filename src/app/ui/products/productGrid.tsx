import { fetchFilteredProducts } from "@/app/lib/data";
import ProductCard from "@/app/ui/products/productCard";

export default async function ProductGrid() {
  const products = await fetchFilteredProducts();
  // console.log(products);

  return (
    <main className="grid grid-cols-1 pb-20 w-[365px] m-auto gap-5 md:grid-cols-3 md:w-[745px] lg:w-[1405px] lg:grid-cols-4">
      {products.map((card) => {
        return <ProductCard key={card.id} {...card} />;
      })}
    </main>
  );
}
