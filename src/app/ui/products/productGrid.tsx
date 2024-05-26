import { fetchFilteredProducts } from "@/app/lib/data";
import Search from "@/app/ui/search";
import ProductCard from "@/app/ui/products/productCard";

export default async function ProductGrid({ query }: { query: string }) {
  const products = await fetchFilteredProducts(query);
  // console.log(products);

  return (
    <main className="pt-[120px] overflow-y-clip">
      <div className="fixed top-[135px] right-3">
        <Search placeholder="Search products..." />
      </div>
      <div className="pt-[80px] grid grid-cols-1 pb-20 w-[365px] m-auto gap-5 md:grid-cols-3 md:w-[750px] lg:w-[1405px] lg:grid-cols-4">
        {products.map((card) => {
          return <ProductCard key={card.id} {...card} />;
        })}
      </div>
    </main>
  );
}
