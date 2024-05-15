import { fetchFilteredProducts } from '@/app/lib/data';
import ProductCard from "@/app/ui/products/productCard";


export default async function ProductGrid() {
    const products = await fetchFilteredProducts();
    console.log(products)


    return (
    
        <div className="flex flex-col md:p-3">
          <div className = "flex flex-wrap">
          {products.map((card) => {
            return (
                <ProductCard cardId={''} cardImage={card.image} key={card.id} {...card}/>
            );
          })}
          </div>
        </div>
    );
}