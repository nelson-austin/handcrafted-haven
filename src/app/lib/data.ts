import { db, sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { notFound } from "next/navigation";

import { Invoice, Order, Product, Review } from "./interface";

export async function fetchFilteredProducts(
  query: string,
  category: string,
  minPrice: number,
  maxPrice: number
) {
  unstable_noStore();

  try {
    const client = await db.connect()
    let categories = ""
    let keyword = ""

    var sqlQuery = `
              SELECT * FROM products
              FULL JOIN product_categories ON products.id = product_categories.product_id
            `;

            let categoryOptions = ""
            let priceOptions = ""

            if (query && query.length > 0) {
              keyword = ` (products.name ILIKE ${`'%${query}%'`} OR products.description ILIKE ${`'%${query}%'`})`
            }
        
            if (category.length > 0) {
              //categories = category.map((_, index) => `$${index + 1}`).join(', ');
              //categoryOptions = ` category_id IN (${categories})`
              categoryOptions = ` category_id = ${parseInt(category)}`
            }
        
            if (minPrice && maxPrice == undefined) {
              priceOptions = ` price >= ${minPrice}`
            }
            if (maxPrice && minPrice == undefined) {
              priceOptions = ` price <= ${maxPrice}`
            }
            if (minPrice != undefined && maxPrice != undefined) {
              priceOptions = ` price BETWEEN ${minPrice} AND ${maxPrice}`
            }
        
            let options = [keyword, categoryOptions, priceOptions].filter(val => val).join(' AND');
            sqlQuery += ` WHERE ${options}`
            console.log(sqlQuery)
        
            // Execute the query with the parameterized values
            const products = await client.query(sqlQuery)
            client.release();

    return products.rows;
  } catch (error) {
    console.error("Database Error: ", error);
    throw new Error("failed to fetch products\n" + error);
  }
}

export async function fetchMyInventory(id: string) {
  unstable_noStore();
  try {
    const data = await sql<Product>`
        SELECT * FROM products
        WHERE products.user_id = ${id}`;
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
  try {
    const orders = await sql`
      SELECT 
        orders.*,
        products.*
      FROM orders
      JOIN products ON orders.product_id = products.id
    `;
    return orders.rows;
  } catch (err) {
    console.error(`Failed to fetch orders: ${err}`);
    return []; // or return null, based on your needs
  }
}

// INVOICES
const ITEMS_PER_PAGE = 5;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
  sellerId: string
) {
  unstable_noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<Invoice>`
      SELECT
        orders.id,
        users.name,
        users.email,
        orders.total_price,
        orders.order_date
      FROM orders
      JOIN users ON orders.user_id = users.id
      JOIN products ON orders.product_id = products.id
      WHERE
        (users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`} OR
        orders.total_price::text ILIKE ${`%${query}%`} OR
        orders.order_date::text ILIKE ${`%${query}%`}) AND
        products.user_id = ${sellerId}
      ORDER BY orders.order_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    
    return invoices.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchInvoicesPages(query: string, sellerId: string) {
  unstable_noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM orders
    JOIN users ON orders.user_id = users.id
    JOIN products ON orders.product_id = products.id
    WHERE
      (users.name ILIKE ${`%${query}%`} OR
      users.email ILIKE ${`%${query}%`} OR
      orders.total_price::text ILIKE ${`%${query}%`} OR
      orders.order_date::text ILIKE ${`%${query}%`}) AND
      products.user_id = ${sellerId}
  `;
  
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}
