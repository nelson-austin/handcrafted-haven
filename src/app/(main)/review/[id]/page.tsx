import { fetchProductById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { revalidatePath } from "next/cache";


export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const product = await fetchProductById(id);

    if (!product) {
        notFound();
      }
    revalidatePath(`/product/${id}`)

    return( 
        <div>
            <div className="pl-3 pr-3 overflow-y-clip">
                <div className="flex flex-col rounded-xl items-left justify-left p-3 bg-blue-100 mt-5">
                <div className="flex flex-col rounded-xl items-left justify-left p-3 bg-blue-100 mt-5">
                    <div className="md:flex md:justify-center">
                    <div className="block bg-gray-50  rounded-xl overflow-hidden shadow-lg mx-4 my-4 p-5 md:min-w-[30rem] md:max-w-[30rem]">
                        <h1 className="font-bold text-[35px] text-center">★ ★ ★</h1>
                        <h1 className="font-bold text-[30px] text-center">Thanks for sending a Review</h1>
                        <p className="text-[30px] text-center">about</p>
                        <p className="font-bold text-[30px] text-center">{product.name}</p>
                        <div className="flex item-center justify-center">
                            <Image
                            src={product.image}
                            width={560}
                            height={620}
                            className="w-[330px] rounded-xl"
                            alt={product.description}
                            />
                        </div>
                        <br />
                        <p className="text-[30px] text-center">We appreciate your comment!</p>
                        <h1 className="font-bold text-[35px] text-center">★ ★ ★</h1>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <Link href={"/"}>
                    <div className="flex items-center justify-center pt-4 text-gray-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                        />
                    </svg>
                    <p>Continue Shopping</p>
                    </div>
            </Link>
            <br />
            <br />
        </div> 
    )}