import SideNav from "../ui/dashboard/sideNav";
import TopNav from "@/app/ui/dashboard/topNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="hidden w-full flex-none md:w-80 md:block">
          <SideNav />
        </div>
        <div className="w-full flex-none md:hidden">
          <TopNav />
        </div>
        <div className="flex-grow p-3 md:overflow-y-auto ">{children}</div>
      </div>
    </>
  );
}
