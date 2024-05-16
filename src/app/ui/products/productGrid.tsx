import { fetchFilteredProducts } from "@/app/lib/data";
import ProductCard from "@/app/ui/products/productCard";

export default async function ProductGrid() {
  const products = await fetchFilteredProducts();
  // console.log(products);

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg:px-5">
      {products.map((card) => {
        return (
          <ProductCard
            cardId={""}
            cardImage={card.image}
            key={card.id}
            {...card}
          />
        );
      })}
    </main>
  );
}
