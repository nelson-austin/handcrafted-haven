import MyInventory from "@/app/ui/dashboard/myInventory";
import { NewItem } from "@/app/ui/dashboard/newItemButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Items",
};

export default function Page() {

  return (
    <div>
      <div className="flex m-10">
        <NewItem />
      </div>
      <MyInventory />
    </div>
  );
}
