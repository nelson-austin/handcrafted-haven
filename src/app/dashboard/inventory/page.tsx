import Search from "@/app/ui/search";
import MyInventory from "@/app/ui/dashboard/myInventory";
import { NewItem } from "@/app/ui/dashboard/updateItem";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Items",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";

  return (
    <div className="">
      <div className="">{/* <h1>My Items for Sell</h1> */}</div>
      <div className="fixed top-30">
        <NewItem />
        <Search placeholder="Search my items..." />
      </div>

      <MyInventory />
    </div>
  );
}
