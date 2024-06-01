import NewProductForm from '@/app/ui/dashboard/newProductForm'
import { auth } from '@/auth';
import { redirect } from 'next/navigation';


export default async function Page() {
    const session = await auth();
    if (session == null) {
        return redirect('/login');
    } else {
    const id = session.user.id;
    return (<NewProductForm  id={id} />);
    }
}