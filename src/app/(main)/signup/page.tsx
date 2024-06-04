import { auth } from "@/auth";
import SignupForm from "./form";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

//metadata.title = "Sign Up";

export default async function SignupPage() {
  const session = await auth();
  if (session) {
    redirect(`/profile/${session.user.id}`);
  }
  return <SignupForm />;
}
