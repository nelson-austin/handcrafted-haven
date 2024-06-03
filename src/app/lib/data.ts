import { db, sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { notFound } from "next/navigation";

import { Invoice, Order, Product, Review, Category, InvoiceDetail } from "./interface";

export async function fetchCategories() {
  unstable_noStore();

  try {
    const data = await sql<Category>`SELECT * FROM categories`;

    return data.rows;
  } catch (error) {
    console.error("Data Fetch Error:", error);
    throw new Error("Failed to fetch categories");
  }
}

export async function fetchFilteredProducts(
  query: string,
  category: string,
  minPrice: number,
  maxPrice: number
) {
  unstable_noStore();

  try {
    const client = await db.connect();
    let keyword = "";

    var sqlQuery = `
              SELECT DISTINCT ON (products.id) * FROM products
              JOIN product_categories ON products.id = product_categories.product_id
            `;

    let categoryOptions = "";
    let priceOptions = "";

    if (query && query.length > 0) {
      keyword = ` (products.name ILIKE ${`'%${query}%'`} OR products.description ILIKE ${`'%${query}%'`})`;
    }

    if (category.length > 0) {
      let categories: string[] = [];
      const cats = category.split(",");
      cats.forEach((cat) => {
        categories.push(`category_id = ${parseInt(cat)}`);
      });
      categoryOptions = ` ${categories.join(" OR ")}`;
    }

    if (minPrice && maxPrice == undefined) {
      priceOptions = ` price >= ${minPrice}`;
    }
    if (maxPrice && minPrice == undefined) {
      priceOptions = ` price <= ${maxPrice}`;
    }
    if (minPrice != undefined && maxPrice != undefined) {
      priceOptions = ` price BETWEEN ${minPrice} AND ${maxPrice}`;
    }

    let options = [keyword, categoryOptions, priceOptions]
      .filter((val) => val)
      .join(" AND");
    sqlQuery += ` WHERE ${options}`;

    // Execute the query with the parameterized values
    const products = await client.query(sqlQuery);
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
        users.name as user_name,
        users.email as user_email,
        orders.order_date as invoice_date,
        SUM(ordered_products.quantity * products.price) as total_price
      FROM orders
      JOIN users ON orders.user_id = users.id
      JOIN ordered_products ON orders.id = ordered_products.order_id
      JOIN products ON ordered_products.product_id = products.id
      WHERE (
        users.name ILIKE ${`%${query}%`}
        OR users.email ILIKE ${`%${query}%`}
        OR CAST((orders.order_date) AS TEXT) ILIKE ${`%${query}%`}
      ) AND
        products.user_id = ${sellerId}
      GROUP BY orders.id, users.name, users.email, orders.order_date
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
    const count = await sql`
      SELECT COUNT(*) as count
      FROM orders
      JOIN users ON orders.user_id = users.id
      JOIN ordered_products ON orders.id = ordered_products.order_id
      JOIN products ON ordered_products.product_id = products.id
      WHERE (
        users.name ILIKE ${`%${query}%`}
        OR users.email ILIKE ${`%${query}%`}
      ) AND
      products.user_id = ${sellerId}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchInvoiceDetail(
  id: string
) {
  unstable_noStore();
  try {
    const invoices = await sql<InvoiceDetail>`
      SELECT
        ordered_products.id,
        products.image as product_image,
        products.image_id as product_image_id,
        products.name as product_name,
        ordered_products.quantity,
        ordered_products.price
      FROM orders
      JOIN users ON orders.user_id = users.id
      JOIN ordered_products ON orders.id = ordered_products.order_id
      JOIN products ON ordered_products.product_id = products.id
      WHERE orders.id = ${id}
      ORDER BY orders.order_date DESC
    `;

    return invoices.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}