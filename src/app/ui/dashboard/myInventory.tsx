import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { UpdateItem } from "./updateItem";
import { fetchMyInventory } from "@/app/lib/data";

export default async function myInventory() {
  const session = await getServerSession(authOptions);
    if(session) {
        const products = await fetchMyInventory(session.user.id);
  return (
    <div className="pt-[85px]">
      <div className="overflow-x-auto">
        <table className="min-w-full mt-20 border-collapse block md:table">
          <thead className="block md:table-header-group">
            <tr className="border-b md:border md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
              <th className="bg-green-900 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Name
              </th>
              <th className="bg-green-900 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Stock
              </th>
              <th className="bg-green-900 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Price
              </th>
              <th className="bg-green-900 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {products?.map((item) => (
              <tr
                key={item.id}
                className="bg-gray-300 border border-green-500 md:border-none block md:table-row"
              >
                <td className="p-2 md:border md:border-green-500 text-left block md:table-cell">
                  {item.name}
                </td>
                <td className="p-2 md:border md:border-green-500 text-left block md:table-cell">
                  {item.quantity_available}
                </td>
                <td className="p-2 md:border md:border-green-500 text-left block md:table-cell">
                  {item.price}
                </td>
                <td className="p-2 hover:bg-gray-100 md:border md:border-green-500 text-left block md:table-cell">
                  <UpdateItem id={item.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
}