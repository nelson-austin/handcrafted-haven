import { lazy } from "react";
const SideComponet = lazy(() => import("./sideComponent"));
const HeroImage = lazy(() => import("./heroImage"));
const Logo = lazy(() => import("./logo"));
import RegisterLink from "./registerLink";

export default function Home() {
  return (
    <main className="flex flex-col md:p-3">
      <div className="flex h-25 items-center shrink-0 bg-green-900 rounded-lg m-3 md:h-40">
        <Logo />
      </div>
      <div className="flex flex-col items-center gap-3 md:flex-row px-3">
        <SideComponet />
        <HeroImage />
      </div>
      <RegisterLink />
    </main>
  );
}
