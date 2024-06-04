import { auth } from "@/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchMyInventory } from "../lib/data";
import Carousel from "@/app/(main)/profile/[id]/carousel";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect(`/login`);
  } else {
    if (!session.user.is_seller) {
      redirect(`/dashboard/welcome`);
    }

  }
  const user = session.user;
  const products = await fetchMyInventory(session.user.id);
  return (
    <main>
      <div className="flex m-5">
        { user.image ? <Image 
        src={user.image}
        width={100}
        height={100}
        alt="My company logo"
        /> : null }
        <h1 className="text-3xl self-center">{user.business_name}</h1>
      </div>
      <div className="m-5 my-10 text-2xl">
        <h1>My Products for Sell:</h1>
        <Carousel products={products} />
      </div>
      <div className="m-5">
        <h1 className="text-2xl">My Account Information:</h1>
        <p className="text-lg">Name: {user.name}</p>
        <p className="mb-5 text-lg">Email: {user.email}</p>
        <Link
          className="font-bold bg-green-900 text-white m-5 p-2 rounded-md hover:bg-green-300 hover:text-black"
          href={`/profile/${user.id}/edit`}
        >
          Edit Profile
        </Link>
      </div>
    </main>
  );
}
