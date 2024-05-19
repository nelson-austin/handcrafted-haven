import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt, { compare } from "bcrypt";
import { User } from "./definitions";
import { v4 } from "uuid";

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

  // Prepare data for insertion into the database
  const { name, email, password, is_seller, business_name } =
    validatedFields.data;

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  user.id = v4();

  // Insert data into the database
  try {
    await sql`
    INSERT INTO users (id, name, email, password, is_seller, business_name)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.is_seller}, ${user.business_name})
        ON CONFLICT (ID) DO NOTHING;
    `;
  } catch (error) {
    console.log("SIAMO QUI");
    return {
      errors: validatedFields.error,
      message: "Database Error: Failed to Create User.",
    };
  }
}

export async function updateUser(
  id: string,
  prevState: SignupState,
  formData: FormData
) {
  const validatedFields = UpdateUser.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    oldPassword: formData.get("oldPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update User.",
    };
  }

  var { name, email, password } = validatedFields.data;

  const isValid = await compare(validatedFields.data.password, password);

  if (!isValid) {
    return {
      errors: { password: ["Incorrect Password"] },
      message: "Failed to Update User, incorrect password.",
    };
  }

  try {
    await sql`
      UPDATE users
      SET name = ${name}, email = ${email}, password = ${password}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update User." };
  }

  revalidatePath(`/profile/${id}`);
  redirect(`/profile/${id}`);
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
