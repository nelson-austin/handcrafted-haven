import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <div className="flex items-center">
      <Image
        src={"/logo-placeholder-image.png"}
        width={100}
        height={100}
        alt="Logo Image"
      />
      <p className="text-sky-100 text-[26px] font-bold">Handcrafted Haven</p>
    </div>
  );
}

export default function AddToCartButton() {
  return (
    <>
      <div className="bg-green-800 my-3 text-2xl rounded-lg p-3 flex justify-center items-center md:hover:bg-green-700 text-sky-100">
        <Link href={"/dashboard/products/addcart"}>
          <button className="">Add to Cart</button>
        </Link>
      </div>
    </>
  );
}
