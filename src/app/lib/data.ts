import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";

import { Product } from "./interface";

export async function fetchFilteredProducts(
  query: string,
) {
  unstable_noStore()
  
  try {
    const products = await sql<Product>`
            SELECT
                products.id,
                products.user_id,
                products.name,
                products.image,
                products.description,
                products.price,
                products.quantity_available
            FROM products
            JOIN users ON products.user_id = users.id
            WHERE
              products.name ILIKE ${`%${query}%`} OR
              products.description ILIKE ${`%${query}%`} OR
              users.name ILIKE ${`%${query}%`}
              `;

    return products.rows;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("Failed to fetch products.");
  }
}

export async function fetchMyInventory() {
    // will complete when user id is ready
    unstable_noStore();
    try {
        const data = await sql<Product>`
        SELECT * FROM products`;
    return data.rows;
  } catch (error) {
    console.error("Data Fetch Error:", error);
    throw new Error("Failed to fetch product data");
  }
}

export async function fetchProductById(id: string) {
  unstable_noStore();
  try {
    const data = await sql<Product>`
        SELECT * FROM products
        WHERE products.id = ${id}`;

    return data.rows[0];
  } catch (error) {
    console.error("Data Fetch Error:", error);
    throw new Error("Failed to find product");
  }
}
