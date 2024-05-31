import { User } from "@/app/lib/interface";
import Logout from "@/app/logout";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function HeaderLinks({ user, cartCount }: { user: User; cartCount: number }) {
  return (
    <div className="flex flex-col md:flex-row items-center">
      {!!user.id && (
        <Link
          className="font-bold bg-green-900 text-white m-5 p-2 rounded-md hover:bg-green-300 hover:text-black"
          href={`/dashboard/`}
        >
          Dashboard
        </Link>
      )}
      {!!user.id && (
        <Link
          className="font-bold bg-green-900 text-white m-5 p-2 rounded-md hover:bg-green-300 hover:text-black"
          href={`/profile/${user.id}`}
        >
          My Profile
        </Link>
      )}
      {!!user.id && <Logout />}
      {!user.id && (
        <Link
          className="font-bold bg-green-900 text-white m-5 p-2 rounded-md hover:bg-green-300 hover:text-black"
          href="/login"
        >
          Login
        </Link>
      )}
      {!user.id && (
        <Link
          className="font-bold bg-green-900 text-white m-5 p-2 rounded-md hover:bg-green-300 hover:text-black"
          href="/signup"
        >
          Sign up
        </Link>
      )}
      {!!user.id && (
        <div className="text-white font-semibold md:hover:text-sky-100 px-12 ml-5 md:m-0">
          <Link href="/cart" className="grid">
            <ShoppingCartIcon className="w-10 col-[1] row-[1] -mx-5 my-2" />
            <span className={`text-[20px] bg-red-900 col-[1] row-[1] p-1 rounded-[50%] w-[25px] h-[25px] flex items-center justify-center 
              ${cartCount < 1 && 'invisible'}`}>
              {cartCount}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
