import { sql } from '@vercel/postgres';
import { Product } from '@/app/lib/interface';

export async function fetchProducts() {
    try {
        const data = await sql<Product>`
        SELECT * FROM products`;
        return data.rows;

    } catch (error) {
        console.error("Data Fetch Error:", error);
        throw new Error('Failed to fetch product data');
    }
}

export async function fetchMyInventory() {
    // will complete when user id is ready
}

export async function fetchProductById( id: string ) {
    try {
        const data = await sql<Product>`
        SELECT product.name FROM products
        WHERE products.id = ${id}`;
        return data.rows;
    } catch (error) {
        console.error("Data Fetch Error:", error);
        throw new Error("Failed to find product");
    }
}