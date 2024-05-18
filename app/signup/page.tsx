import { getServerSession } from "next-auth";
import { metadata } from "../layout";
import SignupForm from "./form";
import { redirect } from "next/navigation";

metadata.title = "Sign Up";

export default async function SignupPage() {
    const session = await getServerSession();
    if(session) {
       redirect("/");
    }
    return <SignupForm />;
}