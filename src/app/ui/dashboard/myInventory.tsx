import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { fetchMyInventory } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";

export default async function myInventory() {
  const session = await getServerSession(authOptions);
    if(session) {
        const products = await fetchMyInventory(session.user.id);
  return (
    <div>
    {products?.map((item) => (
      
      <Link key={item.id} href={`/dashboard/inventory/edit-item/${item.id}`}>
        <div className="grid grid-cols-[1fr_1fr] gap-10 m-10 hover:bg-slate-100 hover:shadow-lg">
          <Image
          src={item.image}
          width={500}
          height={500}
          alt='product image'  
          />
          <div className="">
            
            <h1 className="text-[3em] hover:text-blue-600 hover:underline">{item.name}</h1>
            <p className="pb-10">{item.description}</p>
            <p className="text-[1.2em] pb-2">Selling price: ${item.price}</p>
            <p className="text-[1.2em]">Quantity available: {item.quantity_available}</p>
            
          </div>
        </div>
      </Link>
    ))}
    </div>
  );
}
}