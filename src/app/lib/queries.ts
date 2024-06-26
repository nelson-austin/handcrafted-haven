'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { Item } from './interface';

const FormSchema = z.object({
    id: z.string(),
    name: z.string({
        invalid_type_error: 'Please enter a name for your product.',
    }),
    description: z.string({
        invalid_type_error: 'Please enter a description for your product.',
    }),
    price: z.coerce.number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
    quantity: z.coerce.number(),
    imageId: z.string(),
    image: z.string(),
    category: z.string()
});

export type State = {
    errors?: {
      name?: string[];
      description?: string[];
      price?: string[];
      quantity?: string[];
      category?: string[];
    };
    message?: string | null;
};

const UpdateInventory = FormSchema.omit({ id: true });

export async function updateInventory(id: string, prevState: State, formData: FormData) {
    const validatedFields = UpdateInventory.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
        quantity: formData.get('quantity'),
        imageId: formData.get('imageId'),
        image: formData.get('image'),
        category: formData.get('category')
    })

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Update Product.',
        };
    }

    const { name, image, price, quantity, description, imageId, category } = validatedFields.data;

    try {
        await sql`
            UPDATE products
            SET name = ${name}, image_id = ${imageId}, image = ${image}, description = ${description}, price = ${price}, quantity_available = ${quantity}
            WHERE id = ${id}`;

        await sql`
            DELETE FROM product_categories
            WHERE product_id = ${id}`

        await sql`
        INSERT INTO product_categories (category_id, product_id)
        VALUES (${parseInt(category)}, ${id})
        `
        
    } catch (error) {
        return { message: 'Database Error: Failed to update product.' };
    }
    revalidatePath('/dashboard/inventory');
    redirect('/dashboard/inventory');
}


const NewProduct = FormSchema.omit({ id: true });

export async function newProduct(id: string, prevState: State, formData: FormData) {
    const validatedFields = NewProduct.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
        quantity: formData.get('quantity'),
        imageId: formData.get('imageId'),
        image: formData.get('image'),
        category: formData.get('category')
    })

    
    
    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors)
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Product.',
        };
    }
    
    const { name, price, quantity, description, image, imageId, category } = validatedFields.data;

    console.log("Hello", category)
    
 
    try {
        const result = await sql`
            INSERT INTO products (user_id, name, image_id, image, description, price, quantity_available)
            VALUES (${id}, ${name}, ${imageId}, ${image}, ${description}, ${price}, ${quantity})
            RETURNING id;
            `;
        
        const product_id = result.rows[0].id

        await sql`
            INSERT INTO product_categories (category_id, product_id)
            VALUES (${parseInt(category)}, ${product_id})
            `

    } catch (error) {
        return { message: 'Database Error: Failed to create product.' };
    }
    revalidatePath('/dashboard/inventory');
    redirect('/dashboard/inventory');
}

export async function newOrder(id: string, items: Item[]) {

    try {
        const result = await sql`
            INSERT INTO orders (user_id)
            VALUES (${id})
            RETURNING id;
        `;
        
        const order_id = result.rows[0].id

        items.map(async (item) => {
            await sql`
                INSERT INTO ordered_products (order_id, product_id, quantity, price)
                VALUES (${order_id}, ${item.product_id}, ${item.quantity}, ${item.price})
            `
        })

        console.log("Inserting new Order")

    } catch (error) {
        return { message: 'Database Error: Failed to create order.' };
    }
    revalidatePath('/dashboard/inventory');
    redirect('/dashboard/inventory');
}