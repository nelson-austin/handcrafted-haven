import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";
import { FormSchema } from "@/app/lib/actions";
import { User } from "@/app/lib/interface";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
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

        console.log(validatedFields);
        
        if (validatedFields.success) {
          const response =
            await sql`SELECT * FROM users WHERE email = ${validatedFields.data.email}`;

          if (response.rowCount === 1) {
            const user = response.rows[0];
            const isValid = await compare(
              validatedFields.data.password,
              user.password
            );

            if (isValid) {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                is_seller: user.is_seller,
                business_name: user.business_name,
                password: user.password,
              };
            }
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
        if (user) {
            token.id = (user as User).id;
            token.name = (user as User).name;
            token.email = (user as User).email;
            token.is_seller = (user as User).is_seller;
            token.business_name = (user as User).business_name;
            token.password = (user as User).password;
        }

        return token;
    },
    async session({ session, token, user }) {
        if (session.user) {
            session.user.id = token.id as string;
            session.user.name = token.name as string;
            session.user.email = token.email as string;
            session.user.is_seller = token.is_seller as boolean;
            session.user.business_name = token.business_name as string;
            session.user.password = token.password as string;
        }

        return session;
    }
}
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
