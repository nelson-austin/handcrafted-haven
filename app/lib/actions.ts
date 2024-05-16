"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "../../auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";

const FormSchema = z.object({
  name: z.string().min(1).max(32),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(32)
    .refine((password) => {
      return password.match("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$");
    }, "Password cannot contain at least one letter and one number and be at least 8 characters long"),
  is_seller: z.boolean(),
  business_name: z.string(),
});

const UpdateUser = FormSchema.omit({ is_seller: true, business_name: true });
const CreateUser = FormSchema.refine((schema) => {
  if (schema.is_seller === true && schema.business_name.length < 1) {
    return false;
  }
  return true;
});

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    is_seller?: boolean[];
    business_name?: string[];
  };
  message?: string | null;
};

export async function createUser(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateUser.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    is_seller: formData.get("is_seller") === "true",
    business_name: formData.get("business_name"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create User.",
    };
  }

  // Prepare data for insertion into the database
  const { name, email, password, is_seller, business_name } =
    validatedFields.data;

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  const id = bcrypt.hashSync(email, 10);

  // Insert data into the database
  try {
    await sql`
    INSERT INTO users (name, email, password, is_seller, business_name)
    VALUES (${name}, ${email}, ${hashedPassword}, ${is_seller}, ${business_name})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create User.",
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/profile/${id}`);
  redirect(`/profile/${id}`);
}

export async function updateUser(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateUser.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  var {  name, email, password } = validatedFields.data;

  try {
    await sql`
      UPDATE users
      SET name = ${name}, email = ${email}, password = ${password}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath(`/profile/${id}`);
  redirect(`/profile/${id}`);
}

export async function deleteUser(id: string) {
  try {
    await sql`DELETE FROM users WHERE id = ${id}`;
    revalidatePath(`/profile/${id}`);
    redirect('/');
  } catch (error) {
    return { message: "Database Error: Failed to Delete User." };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
