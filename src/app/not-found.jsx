import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="h-screen flex items-center justify-center w-full text-center">
      <div>
        <p className=" text-red-400">Something went wrong with this page || 404</p>
        <Link href="/">
          <button className="bg-red-50/30 py-3 px-10 rounded-lg mt-5 border">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
