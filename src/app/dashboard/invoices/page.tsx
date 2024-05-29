import { fetchInvoicesPages } from "@/app/lib/data";
import Pagination from "@/app/ui/invoices/pagination";
import InvoicesTable from "@/app/ui/invoices/table";
import Search from "@/app/ui/search";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const totalPages = await fetchInvoicesPages(query, session.user.id);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
      </div>
      {
        <InvoicesTable
          query={query}
          currentPage={currentPage}
          sellerId={session.user.id}
        />
      }
      <div className="mt-5 flex w-full justify-center">
        {<Pagination totalPages={totalPages} />}
      </div>
    </div>
  );
}
