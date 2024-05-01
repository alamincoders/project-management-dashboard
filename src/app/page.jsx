import Table from "@/components/ui/Table";
import Link from "next/link";
import UserPage from "./user/page";

export default function Home() {
  return (
    <div className="lg:ml-[20rem] bg-white ml-2 my-2 mr-2 lg:my-4 xl:my-8 lg:mr-4 xl:mr-8 p-2 lg:p-4 rounded">
      <h1>Welcome to Project Management Dashboard</h1>
      <Link href="/login">Login</Link>
      <br />
      <Link href="/projects">Projects Overview</Link>
      <br />
      <Link prefetch href="/initial-data">
        Prefetching Using initial data --- Good for SEO
      </Link>

      <h1>Users Zustand</h1>
      <UserPage />

      <br />
      <Table />
    </div>
  );
}














