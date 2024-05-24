import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            is_seller: boolean;
            business_name: string;
            password: string;
        };
    }
}