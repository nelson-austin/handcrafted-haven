import { db } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET() {
    const client = await db.connect();

    let products;

    let categories = [1, 2]

    try {
        const placeholders = categories.map((_, index) => `$${index + 1}`).join(', ');
        console.log(placeholders)
        const query = `
            SELECT * FROM products
            FULL JOIN product_categories ON products.id = product_categories.product_id
            WHERE category_id IN (${placeholders})`;

        // Execute the query with the parameterized values
        const products = await client.query(query, categories)
        console.log(products)

    } catch (error) {
        return NextResponse.json({ error });
    }

    return NextResponse.json({ data: products})
}