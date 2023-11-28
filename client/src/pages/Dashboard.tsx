import { useContext } from "react";
import { AppContext } from "../components";
import { getDate, useTitle } from "../lib";
import { IoPerson } from "react-icons/io5";
import { Link, Outlet, useLocation } from "react-router-dom";

export function Dashboard() {
  const { user } = useContext(AppContext);
  const loc = useLocation().pathname;
  useTitle("Dashboard");

  return (
    <section className="mt-4 w-full max-w-[1080px] p-4">
      <div className="flex w-full flex-col items-center gap-y-2">
        <div className="flex w-full basis-1/6 items-center gap-x-4 rounded-md border border-l-brdr bg-l-bg-1 p-4 shadow-sm shadow-l-shdw dark:border-none dark:bg-d-bg-03dp dark:shadow-none">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-silver">
            <IoPerson className="h-16 w-16 text-silver" />
          </div>
          <div className="flex flex-col font-poppins text-lg font-semibold">
            <span className="text-xs font-thin text-gray dark:text-white/60">
              Hello,
            </span>
            <h2>{user?.username}</h2>
          </div>
          <span className="ml-auto pr-2 font-poppins text-sm text-black dark:text-white/60">
            {getDate()}
          </span>
        </div>
        <nav className="flex h-12 w-full select-none items-center gap-x-4 rounded-md border border-l-brdr bg-l-bg-1 px-4 font-poppins text-sm shadow-sm shadow-l-shdw dark:border-none dark:bg-d-bg-03dp dark:shadow-none">
          <Link
            className={`flex h-full cursor-pointer items-center border-b-2 ${
              loc.endsWith("/manage-videos") ||
              loc.endsWith("dashboard/") ||
              loc.endsWith("dashboard")
                ? "border-l-s text-black dark:border-d-s dark:text-white/90"
                : "border-transparent text-gray hover:text-black dark:text-white/60 dark:hover:text-white/90"
            }`}
            to="/dashboard/manage-videos"
          >
            <span>Manage Videos</span>
          </Link>
          <Link
            className={`flex h-full cursor-pointer items-center border-b-2 ${
              loc.endsWith("/liked-videos")
                ? "border-l-s text-black dark:border-d-s dark:text-white/90"
                : "border-transparent text-gray hover:text-black dark:text-white/60 dark:hover:text-white/90"
            }`}
            to="/dashboard/liked-videos"
          >
            <span>Liked Videos</span>
          </Link>
        </nav>
        <Outlet />
      </div>
    </section>
  );
}
