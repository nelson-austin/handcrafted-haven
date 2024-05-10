import { lazy } from "react";
import Buttons from "./ui/landing-page/buttons/buttons";
import { Metadata } from "next";
import Header from "./ui/landing-page/partials/header";
import Footer from "./ui/landing-page/partials/footer";
import Carousel from "@/components/carousel.component";
import HeroRegister from "./ui/landing-page/hero-components/hero-register";
import HeroViewProducts from "./ui/landing-page/hero-components/hero-view-products";
import HeroLearnMore from "./ui/landing-page/hero-components/hero-learn-more";
// import RegisterLink from "./ui/registerLink";

export const metadata: Metadata = {
  title: "Welcome to Handcrafted Haven",
  description: "Login into Handcrafted Haven or Sign Up",
};

export default function Home() {
  let slides: any = [<HeroRegister />, <HeroViewProducts />, <HeroLearnMore />];
  return (
    <div className="flex flex-col md:px-10 lg:px-60">
      <div className="flex h-25 items-center shrink-0 bg-[#496245] rounded-lg m-3 md:h-40">
        <Header />
      </div>
      <main className="flex flex-col gap-3">
        {/* <Carousel slides={slides} /> */}
        {/* <HeroRegister /> */}
        <HeroLearnMore />
        {/* <HeroViewProducts /> */}
        <Buttons />
      </main>
      {/* <RegisterLink /> */}
      <Footer />
    </div>
  );
}
