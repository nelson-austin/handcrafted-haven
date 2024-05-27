import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { notFound } from "next/navigation";

import { Order, Product, Review } from "./interface";

export async function fetchFilteredProducts(query: string) {
  unstable_noStore();

  try {
    const products = await sql<Product>`
            SELECT
                products.id,
                products.user_id,
                products.name,
                products.image,
                products.description,
                products.price,
                products.quantity_available,
                products.is_sold_out
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
    notFound();
    throw new Error("Failed to find product");
  }
}

export async function fetchReviewsByProductById(id: string) {
  unstable_noStore();
  try {
    const data = await sql<Review>`
        SELECT * FROM reviews
        JOIN users ON reviews.user_id = users.id
        WHERE product_id = ${id}`;

    return data.rows;
  } catch (error) {
    console.error("Data Fetch Error:", error);
    throw new Error("Failed to find reviews");
  }
}

export async function fetchOrderHistory() {
  // unstable_noStore();
  try {
    const orders = await sql<Order>`
  SELECT * FROM orders JOIN products ON products.user_id = user_id
  `;
    return orders.rows;
  } catch (err) {
    console.error(`Failed to orders... ${err}`);
  }
}
