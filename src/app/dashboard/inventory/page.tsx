import Search from "@/app/ui/search";
import MyInventory from '@/app/ui/dashboard/myInventory';
import { NewItem } from '@/app/ui/dashboard/buttons';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'My Items',
};
 
export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
    };
  }) {
    const query = searchParams?.query || '';
 
  return (
    <div className="w-full">
        <div className="flex w-full items-center justify-between">
        <h1>My Items for Sell</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search my items..." />
            <NewItem />
        </div>
            <MyInventory />
    </div>
  );
}