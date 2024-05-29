import { getServerSession } from "next-auth";
import UpdateUserForm from "./form";
import { redirect, useParams } from "next/navigation";
import { authOptions } from "@/app/lib/authOptions";

//metadata.title = "Profile Update";

export default async function UpdateUserPage() {
    const session = await getServerSession(authOptions);

    if(!session) {
       redirect("/login");
    }

    const image = session.user.image;
    const image_id = session.user.image_id
    
    return <UpdateUserForm imageUrl={image} imageId={image_id}/>;
}