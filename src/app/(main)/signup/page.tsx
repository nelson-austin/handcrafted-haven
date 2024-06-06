import { auth } from "@/auth";
import SignupForm from "./form";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
};

//metadata.title = "Sign Up";

export default async function SignupPage() {
  const session = await auth();
  if (session) {
    redirect(`/profile/${session.user.id}`);
  }
  return (
    <>
      <SignupForm />
      <span className="px-6 pb-20">Already have an account? <Link className="text-blue-900 hover:underline" href={'/login'}>Log in</Link></span>
    </>
  );
}
