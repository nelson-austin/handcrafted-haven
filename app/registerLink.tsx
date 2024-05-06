import Link from "next/link";

export default function RegisterLink() {
  return (
    <p className="p-10 text-[22px] text-gray-900 text-center md:pt-10 text-2xl">
      Don't have an Account
      <Link
        href={"/register"}
        className="underline underline-offset-6 text-gray-800 md:hover:text-gray-900 ease-in duration-300 hover:bg-blue-300 p-2 hover:no-underline rounded-lg"
      >
        Sign Up Here
      </Link>
    </p>
  );
}
