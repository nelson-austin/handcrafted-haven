import Logo from "./dasboard/logo";

export default function Header() {
  return (
    <div className="">
      <div className="flex h-25 items-center shrink-0 bg-green-800 rounded-lg m-3 md:h-40">
        <Logo />
      </div>
    </div>
  );
}
