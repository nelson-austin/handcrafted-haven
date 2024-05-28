import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath, unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt, { compare } from "bcrypt";
import { v4 } from "uuid";
import { User } from "./interface";

export const FormSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(50)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    ),
  is_seller: z.boolean(),
  business_name: z.string(),
});

const UpdateUser = FormSchema.omit({ is_seller: true, business_name: true });
const CreateUser = FormSchema.refine((schema) => {
  if (schema.is_seller) {
    if (schema.business_name === "") return false;
  }
  return true;
});

export type SignupState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    business_name?: string[];
  };
  message?: string | null;
};

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function createUser(user: User) {
  // Validate form using Zod
  const validatedFields = CreateUser.safeParse({
    name: user.name,
    email: user.email,
    password: user.password,
    is_seller: user.is_seller,
    business_name: user.business_name,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create User.",
    };
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(user.password, 10);

  user.id = v4();

  // Insert data into the database
  try {
    await sql`
    INSERT INTO users (id, name, email, password, is_seller, business_name)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.is_seller}, ${user.business_name})
        ON CONFLICT (ID) DO NOTHING;
    `;
  } catch (error) {
    return {
      errors: validatedFields.error,
      message: "Database Error: Failed to Create User.",
    };
  }
}

export async function updateUser(
  user: User
) {
  const validatedFields = UpdateUser.safeParse({
    name: user.name,
    email: user.email,
    password: user.password,
    is_seller: user.is_seller,
    business_name: user.business_name,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update User.",
    };
  }

  const hashedPassword = bcrypt.hashSync(user.password, 10);

  try {
    await sql`
      UPDATE users
      SET name = ${user.name}, email = ${user.email}, password = ${hashedPassword}, business_name = ${user.business_name}
      WHERE id = ${user.id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update User." };
  }
}

export async function deleteUser(id: string) {
  try {
    await sql`DELETE FROM users WHERE id = ${id}`;
    revalidatePath(`/`);
    redirect("/");
  } catch (error) {
    return { message: "Database Error: Failed to Delete User." };
  }
}

export async function getProfileById(id: string) {
  unstable_noStore();
  try {
    const data = await sql<User>`
        SELECT id, name, email, is_seller, business_name FROM users
        WHERE id = ${id}`;

    return data.rows[0];
  } catch (error) {
    console.error("Data Fetch Error:", error);
    throw new Error("Failed to find user");
  }
}