"use client";
import { useSidebar } from "@/context/SidebarProvider";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const Sidebar = () => {
  const { activeSidebar, toggleSidebar } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Dynamic import to ensure code runs only on client-side
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHideSidebar = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <aside
      className={`h-screen bg-dark duration-300 z-[9999] ease-in-out ${
        isMobile && activeSidebar ? "absolute -left-[100%] top-0 " : `flex w-[18.125rem] left-0 top-0 ${isMobile ? "absolute" : "fixed"}`
      }`}
    >
      <div className="w-full no-scrollbar flex flex-col overflow-y-scroll duration-300 ease-linear">
        <div className="py-5 px-6 sticky top-0 bg-dark z-50 flex justify-between items-center">
          <Link className="inline-flex items-center gap-3" href="/">
            <span className="text-[24px] text-white font-semibold border p-1">PMD Hero</span>
          </Link>
          <button className="lg:hidden" onClick={toggleSidebar}>
            <FaArrowLeftLong className="text-secondary" />
          </button>
        </div>
        <div className="">
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6 flex flex-col gap-3">
            <div className="">
              <h3 className="mb-4 ml-4 text-sm font-medium text-secondary uppercase">Menu</h3>
              <ul className="flex flex-col gap-1.5">
                <li onClick={handleHideSidebar}>
                  <Link href="/" className='className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-white duration-300 ease-in-out hover:bg-menuHover'>
                    Overview
                  </Link>
                </li>
                <li onClick={handleHideSidebar}>
                  <Link href="/initial-data" className='className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-white duration-300 ease-in-out hover:bg-menuHover'>
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
