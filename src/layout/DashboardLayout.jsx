import Navbar from "@/components/shared/Navbar/Navbar";
import Sidebar from "@/components/shared/SideBar/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* sidebar start here  */}
      <Sidebar />
      {/* content aria  */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden w-full ">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
};
export default DashboardLayout;
