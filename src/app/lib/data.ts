import { sql } from '@vercel/postgres';

import {
    Product
} from './interface';

export async function fetchFilteredProducts() {

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
            FROM products`;

        return products.rows;
    } catch(error) {
        console.error('Database Error: ', error);
        throw new Error ('Failed to fetch products.')
    }
}
