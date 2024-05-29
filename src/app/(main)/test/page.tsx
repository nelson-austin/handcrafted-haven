"use client"
import { useEffect, useState } from "react"
import ProductCard from "@/app/ui/products/productCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    await fetch('/api/get-products')
    .then( res => res.json() )
    .then( data => {
        setProducts(data.data.rows);
      console.log(data.data.rows);
    })
    .catch( err => console.log(err) )
    .finally( () => {
      setLoading(false);
    })
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <main>
        {
            loading?
            <div>
                Loading Prodcuts...
            </div>
            :
            <div className="pt-[80px] grid grid-cols-1 pb-20 w-[365px] m-auto gap-5 md:grid-cols-3 md:w-[750px] lg:w-[1405px] lg:grid-cols-4">
            {products.map((card:any, index) => (
              <ProductCard key={card.id} {...card} />
            ))}
          </div>
        }
    </main>
  )
}