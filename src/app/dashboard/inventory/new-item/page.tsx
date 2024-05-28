import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import NewProductForm from '@/app/ui/dashboard/newProductForm'
import { redirect } from 'next/navigation';


export default async function Page() {
    const session = await getServerSession(authOptions);
    if (session == null) {
        return redirect('/login');
    } else {
    const id = session.user.id;
    return (<NewProductForm  id={id} />);
    }
}