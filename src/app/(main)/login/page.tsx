import { auth } from "@/auth";
import LoginForm from "./form";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
};

//metadata.title = "Login";

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect(`/profile/${session.user.id}`);
  }
  return (
    <>
    <LoginForm />
    <span className="px-6 pb-20">Don&apos;t have an account? <Link className="text-blue-900 hover:underline" href={'/signup'}>Sign Up</Link></span>
    </>
  );
}
