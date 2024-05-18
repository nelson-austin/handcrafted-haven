import { getServerSession } from "next-auth";
import { metadata } from "../layout";
import LoginForm from "./form";
import { redirect } from "next/navigation";

metadata.title = "Login";

export default async function LoginPage() {
    const session = await getServerSession();
    if(session) {
       redirect("/");
    }
    return <LoginForm />;
}