import { PlusIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function NewItem() {
  return (
    <Link
      href="/dashboard/inventory/new-item"
      className="flex w-[360px] gap-3 mb-5 p-5 items-center justify-center rounded-lg bg-green-900 px-4 text-lg font-medium text-sky-100 transition-colors hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 md:w-[420px]"
    >
      <span className="text-center">Add New Item</span>{" "}
      <PlusIcon className="h-5 md:ml-2" />
    </Link>
  );
}

export function UpdateItem({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/inventory/edit-item/${id}`}
      className="rounded-lg p-2"
    >
      <Cog6ToothIcon className="w-5" />
    </Link>
  );
}
