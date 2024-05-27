import { Order, Product } from "@/app/lib/interface";
import Image from "next/image";
import Link from "next/link";

interface Orders extends Product {}

interface Orders extends Order {}

export default function OrderHistoryCard({
  quantity,
  total_price,
  name,
  image,
}: Orders) {
  return (
    <section>
      <h2>{name}</h2>
      <Image src={image} width={100} height={100} alt={name} />
      <p>{quantity}</p>
      <p>{total_price}</p>
    </section>
  );
}
