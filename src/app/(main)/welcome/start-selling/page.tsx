import { auth } from "@/auth";
import SignupForm from "./form";
import { redirect } from "next/navigation";

//metadata.title = "Sign Up";

export default async function SignupPage() {
  const session = await auth();
  if (session?.user.is_seller) {
    redirect(`/dashboard`);
  }
  if (session) {
  return <SignupForm user={session.user}/>;
  } else {
    redirect('/login');
  }
}