import SideNav from "../ui/dashboard/side-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-80">
        <SideNav />
      </div>
      <div className="flex-grow p-5 md:overflow-y-auto ">{children}</div>
    </div>
  );
}
