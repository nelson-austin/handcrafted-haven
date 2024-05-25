'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

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
    image: z.string(),
});

export type State = {
    errors?: {
      name?: string[];
      description?: string[];
      price?: string[];
      quantity?: string[];
    };
    message?: string | null;
};

const UpdateInventory = FormSchema.omit({ id: true, image: true });

export async function updateInventory(id: string, prevState: State, formData: FormData) {
    const validatedFields = UpdateInventory.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
        quantity: formData.get('quantity'),
    })

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Update Product.',
        };
    }

    const { name, price, quantity, description } = validatedFields.data;

    try {
        await sql`
            UPDATE products
            SET name = ${name}, description = ${description}, price = ${price}, quantity_available = ${quantity}
            WHERE id = ${id}`;
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
        image: formData.get('image'),
    })
    
    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Product.',
        };
    }
    
    const { name, price, quantity, description, image } = validatedFields.data;
 
    try {
        await sql`
            INSERT INTO products (user_id, name, image, description, price, quantity_available)
            VALUES (${id}, ${name}, ${image}, ${description}, ${price}, ${quantity})
            `;
    } catch (error) {
        return { message: 'Database Error: Failed to create product.' };
    }
    revalidatePath('/dashboard/inventory');
    redirect('/dashboard/inventory');
}