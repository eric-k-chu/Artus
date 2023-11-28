import { Link } from "react-router-dom";
import { TbWorldQuestion } from "react-icons/tb";

export function NotFound() {
  return (
    <main className="container flex flex-col items-center gap-y-4">
      <TbWorldQuestion size={40} className="mt-60" />
      <h2 className="font-poppins font-semibold leading-8">
        The page you requested does not exist.
      </h2>
      <Link to="/" className="rounded-md bg-l-p p-2 text-white/90 dark:bg-d-p">
        Go to Home
      </Link>
    </main>
  );
}
