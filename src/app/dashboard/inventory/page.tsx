import Search from "@/app/ui/search";
import MyInventory from "@/app/ui/dashboard/myInventory";
import { NewItem } from "@/app/ui/dashboard/newItemButton";
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
    <div>
      <div className="flex m-10">
        <NewItem />
      </div>
      <MyInventory />
    </div>
  );
}
