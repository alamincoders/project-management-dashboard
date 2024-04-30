"use client";
import { useSidebar } from "@/context/SidebarProvider";
import Link from "next/link";
import { CiSearch, CiUser } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="sticky top-0 z-[999] flex w-full bg-foreGround shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:drop-shadow-none lg:pl-[18.125rem]">
      <nav className="flex flex-grow w-full items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <button onClick={toggleSidebar} className="lg:hidden border p-1">
          <RxHamburgerMenu />
        </button>
        <div className="hidden sm:block">
          <form action="" method="POST">
            <div className="relative flex items-center">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                <CiSearch className="text-xl" />
              </button>

              <input type="text" placeholder="Type to search..." className="w-full bg-transparent pl-9 pr-4 focus:outline-none xl:w-125 text-sm font-normal" />
            </div>
          </form>
        </div>

        {/* header right  */}
        <div className="flex gap-6 items-center">
          <ul className="flex gap-3 items-center">
            <li>{/* <DarkMood /> */}</li>

            <li>
              <Link href="/login" className="inline-flex items-center justify-center cursor-pointer gap-2">
                <CiUser className="text-xl" /> <span>Sign In</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
