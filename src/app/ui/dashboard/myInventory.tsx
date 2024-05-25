import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { UpdateItem } from "./buttons"
import { fetchMyInventory } from "@/app/lib/data"


export default async function myInventory() {

    const session = await getServerSession(authOptions);
    if(session) {
        const products = await fetchMyInventory(session.user.id);
        
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Stock</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity_available}</td>
                            <td>{item.price}</td>
                            <td><UpdateItem id={item.id}  /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
}