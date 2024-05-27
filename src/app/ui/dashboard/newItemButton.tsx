import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function NewItem() {
  return (
    <Link
      href="/dashboard/inventory/new-item"
      className="flex w-[200px] gap-3 mb-5 p-4 items-center justify-center rounded-lg bg-green-900 px-4 text-lg font-medium text-sky-100 transition-colors hover:bg-green-700"
    >
      <span className="text-center">Add New Item</span>{" "}
      <PlusIcon className="h-5 ml-2" />
    </Link>
  );
}
