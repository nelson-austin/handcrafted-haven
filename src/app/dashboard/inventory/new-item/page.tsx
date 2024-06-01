import NewProductForm from '@/app/ui/dashboard/newProductForm'
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { fetchCategories } from "@/app/lib/data";


export default async function Page() {
    const session = await auth();
    const categories = await fetchCategories();
    if (session == null) {
        return redirect('/login');
    } else {
    const id = session.user.id;
    return (<NewProductForm  id={id} categories={categories}/>);
    }
}