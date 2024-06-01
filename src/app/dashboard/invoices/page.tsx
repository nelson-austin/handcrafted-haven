import { fetchInvoicesPages } from "@/app/lib/data";
import Pagination from "@/app/ui/invoices/pagination";
import InvoicesTable from "@/app/ui/invoices/table";
import Search from "@/app/ui/search";
import { auth } from "@/auth";
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

  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  //const totalPages = await fetchInvoicesPages(query, session.user.id);
  const totalPages = await fetchInvoicesPages(query, "87fe51e3-2b78-44b4-aaf2-02a432b7cb7c");

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
          //sellerId={session.user.id}
          sellerId={"87fe51e3-2b78-44b4-aaf2-02a432b7cb7c"}
        />
      }
      <div className="mt-5 flex w-full justify-center">
        {<Pagination totalPages={totalPages} />}
      </div>
    </div>
  );
}
