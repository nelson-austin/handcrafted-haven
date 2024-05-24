import { User } from "@/app/lib/interface";
import Logout from "@/app/logout";
import Link from "next/link";

export default function HeaderLinks({ user, cartCount }: { user: User; cartCount: number }) {
  return (
    <div className="flex flex-col md:flex-row items-center">
      {!!user.id && !!user.is_seller === true && (
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
        <div className="text-sky-400 font-semibold leading-none mr-4 md:hover:text-sky-100">
          <Link href="/cart" className="text-[23px] flex flex-col items-center">
            CART{" "}
            <span className="cart-badge text-orange-400 text-[33px]">
              {cartCount}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
