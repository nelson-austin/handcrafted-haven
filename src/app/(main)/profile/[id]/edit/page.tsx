
import { auth } from "@/auth";
import UpdateUserForm from "./form";
import { redirect, useParams } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile",
};

//metadata.title = "Profile Update";

export default async function UpdateUserPage() {
    const session = await auth();

    if(!session) {
       redirect("/login");
    }

    const image = session.user.image;
    const image_id = session.user.image_id
    
    return <UpdateUserForm imageUrl={image} imageId={image_id}/>;
}