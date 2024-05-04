import Link from "next/link";

export default function RegisterLink() {
  return (
    <p className="p-10 text-[22px] text-center md:pt-10 text-2xl">
      Don't have an Account
      <Link
        href={"/register"}
        className="underline underline-offset-4 text-gray-800 md:hover:text-gray-900 hover:bg-sky-100 p-2 hover:no-underline rounded-lg"
      >
        Sign Up Here
      </Link>
    </p>
  );
}
