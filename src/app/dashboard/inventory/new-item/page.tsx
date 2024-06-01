import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import NewProductForm from '@/app/ui/dashboard/newProductForm'
import { redirect } from 'next/navigation';
import { fetchCategories } from "@/app/lib/data";


export default async function Page() {
    const session = await getServerSession(authOptions);
    const categories = await fetchCategories()
    if (session == null) {
        return redirect('/login');
    } else {
    const id = session.user.id;
    return (<NewProductForm  id={id} categories={categories}/>);
    }
}