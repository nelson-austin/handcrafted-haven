import UserProfileView from "./profile";
import { getProfileById } from "@/app/lib/actions";
import { fetchMyInventory } from "@/app/lib/data";
import { auth } from "@/auth";

export default async function UserProfilePage({ params }: { params: { id: string }}) {
    const session = await auth();
    const profile = await getProfileById(params.id);
    const products = await fetchMyInventory(params.id);

    return <UserProfileView profile={profile} user={session?.user} products={products} />;
}