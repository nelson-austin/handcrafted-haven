import { auth } from "@/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Home",
};

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect(`/login`);
  } else {
    if (!session.user.is_seller) {
      redirect(`/profile/${session.user.id}`);
    }
  }

  return (
    <main>
      <p>Dashboard</p>
    </main>
  );
}
