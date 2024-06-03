"use server";

import { fetchInvoiceDetail } from "@/app/lib/data";
import Image from "next/image";

export default async function InvoicesDetailsTable({ id }: { id: string }) {
  const details = await fetchInvoiceDetail(id);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {details?.map((row) => (
              <div key={row.id} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500"><Image
                        src={row.product_image}
                        alt={row.product_name}
                        width={150}
                        height={150}
                      /></p>
                    <p className="text-sm text-gray-500">{row.product_name}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">Price: ${row.price}</p>
                    <p>x{row.quantity}</p>
                  </div>
                </div>
                {row.quantity > 1 && <div className="flex w-full items-center justify-between pt-4">
                  <p className="text-xl font-medium">
                    Subtotal: ${row.price * row.quantity}
                  </p>
                </div>}
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Picture
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Product
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Quantity
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {details?.map((row) => (
                <tr
                  key={row.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={row.product_image}
                        alt={row.product_name}
                        width={150}
                        height={150}
                      />
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {row.product_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">${row.price}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {row.quantity}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    ${row.price * row.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="text-xl font-medium mt-4">Total: ${details?.reduce((acc, row) => acc + row.price * row.quantity, 0)}</h3>
        </div>
      </div>
    </div>
  );
}
