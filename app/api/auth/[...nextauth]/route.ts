import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";
import { FormSchema } from "../../../lib/actions";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const LoginSchema = FormSchema.omit({
          name: true,
          is_seller: true,
          business_name: true,
        });

        const validatedFields = LoginSchema.safeParse({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (validatedFields.success) {
          const response =
            await sql`SELECT * FROM users WHERE email = ${validatedFields.data.email}`;
            console.log({ response });
          //if(false)
          if (response.rowCount === 1) {
            const user = response.rows[0];
            const isValid = await compare(
              validatedFields.data.password,
              user.password
            );
            console.log("isValid: ", isValid);
            if (isValid) {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                is_seller: user.is_seller,
                business_name: user.business_name,
              };
            }
          }
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
