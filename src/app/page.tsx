import { lazy } from "react";
const SideComponet = lazy(() => import("./ui/landing-page/hero-image-content"));
const HeroImage = lazy(() => import("./ui/landing-page/heroImage"));
const Logo = lazy(() => import("./ui/landing-page/logo"));
// import RegisterLink from "./ui/registerLink";

export default function Home() {
  return (
    <main className="flex flex-col md:p-10 lg:px-60">
      <div className="flex h-25 items-center shrink-0 bg-[#496245] rounded-lg m-3 md:h-40">
        <Logo />
      </div>
      <div className="p-3">
        {/* <SideComponet /> */}
        <HeroImage />
      </div>
      {/* <RegisterLink /> */}
    </main>
  );
}
