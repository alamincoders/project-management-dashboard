import Link from "next/link";
import UserPage from "./user/page";

export default function Home() {
  return (
    <div>
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
    </div>
  );
}
