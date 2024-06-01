
import { auth } from "@/auth";
import LoginForm from "./form";
import { redirect } from "next/navigation";

//metadata.title = "Login";

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect(`/profile/${session.user.id}`);
  }
  return <LoginForm />;
}
