import { getServerSession } from "next-auth";
import UserProfileView from "./profile";
import { getProfileById } from "@/app/lib/actions";
import { authOptions } from "@/app/lib/authOptions";
import { fetchMyInventory } from "@/app/lib/data";

export default async function UserProfilePage({ params }: { params: { id: string }}) {
    const session = await getServerSession(authOptions);
    const profile = await getProfileById(params.id);
    const products = await fetchMyInventory(params.id);

    return <UserProfileView profile={profile} user={session?.user} products={products} />;
}