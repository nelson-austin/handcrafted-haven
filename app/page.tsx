import Link from "next/link";
import LoginButton from "./loginButton";
import SideComponet from "./sideComponent";
import Cart from "./ui/cart";
import Header from "./ui/header";
import HeroImage from "./heroImage";
import RegisterLink from "./registerLink";

export default function Home() {
  return (
    <main className="">
      <Header />
      <div className="flex flex-col  items-center gap-3 md:flex-row px-3">
        <SideComponet />
        <HeroImage />
      </div>
      <RegisterLink />
    </main>
  );
}
