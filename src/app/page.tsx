import { lazy } from "react";
import Buttons from "./ui/landing-page/buttons/buttons";
const HeroRegister = lazy(
  () => import("./ui/landing-page/hero-components/hero-register")
);
import { Metadata } from "next";
import Header from "./ui/landing-page/partials/header";
import Footer from "./ui/landing-page/partials/footer";
import HeroViewProducts from "./ui/landing-page/hero-components/hero-view-products";
// import RegisterLink from "./ui/registerLink";

export const metadata: Metadata = {
  title: "Welcome to Handcrafted Haven",
  description: "Login into Handcrafted Haven or Sign Up",
};

export default function Home() {
  return (
    <div className="flex flex-col md:px-10 lg:px-60">
      <div className="flex h-25 items-center shrink-0 bg-[#496245] rounded-lg m-3 md:h-40">
        <Header />
      </div>
      <main className="p-3">
        <HeroRegister />
        <Buttons />
      </main>
      {/* <RegisterLink /> */}
      <Footer />
    </div>
  );
}
