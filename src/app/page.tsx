import Buttons from "./ui/landing-page/buttons/buttons";
import { Metadata } from "next";
import Header from "./ui/landing-page/partials/header";
import Footer from "./ui/landing-page/partials/footer";
import HeroContent from "./ui/landing-page/hero-components/hero-content";

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
      <main className="flex flex-col gap-3">
        <HeroContent />
        <Buttons />
      </main>
      {/* <RegisterLink /> */}
      <Footer />
    </div>
  );
}
