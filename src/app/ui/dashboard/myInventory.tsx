import { UpdateItem } from "./buttons"
import { fetchProducts } from "@/app/lib/queries"


export default async function myInventory() {
    const products = await fetchProducts();
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