import { lazy } from "react";
const SideComponet = lazy(() => import("./ui/sideComponent"));
const HeroImage = lazy(() => import("./ui/heroImage"));
const Logo = lazy(() => import("./ui/logo"));
import RegisterLink from "./ui/registerLink";

export default function Home() {
  return (
    <main className="flex flex-col md:p-3">
      <div className="flex h-25 items-center shrink-0 bg-[#496245] rounded-lg m-3 md:h-40">
        <Logo />
      </div>
      <div className="p-3">
        {/* <SideComponet /> */}
        <HeroImage />
      </div>
      <RegisterLink />
    </main>
  );
}
