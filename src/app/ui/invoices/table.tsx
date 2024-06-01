import { fetchFilteredInvoices } from "@/app/lib/data";
import Link from "next/link";

export default async function InvoicesTable({
  query,
  currentPage,
  sellerId,
}: {
  query: string;
  currentPage: number;
  sellerId: string;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage, sellerId);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{invoice.user_name}</p>
                    <p className="text-sm text-gray-500">
                      {invoice.user_email}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{invoice.total_price}</p>
                    <p>{invoice.invoice_date?.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <Link href={`/invoices/${invoice.id}`}>
                    Open Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Open Detail
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{invoice.user_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.user_email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.total_price}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.invoice_date?.toLocaleString() ?? "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
