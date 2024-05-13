import { PlusIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function NewItem() {
  return (
    <Link
      href="/dashboard/inventory/new-item"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">New Item</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateItem({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/inventory/edit-item/${id}`}
      className="rounded-md p-2 hover:bg-gray-100"
    >
      <Cog6ToothIcon className="w-5" />
    </Link>
  );
}