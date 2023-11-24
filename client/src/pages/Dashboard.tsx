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
    <div className="mt-8 w-full max-w-[1080px] p-4">
      <div className="flex w-full flex-col items-center rounded-md border border-silver bg-white dark:border-gray dark:bg-void">
        <div className="flex w-full basis-1/6 items-center gap-x-4 border-b border-silver p-4 dark:border-gray">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-silver">
            <IoPerson className="h-16 w-16 text-silver" />
          </div>
          <div className="flex flex-col font-poppins text-lg font-semibold">
            <span className="text-xs text-gray dark:text-silver">Hello,</span>
            <h2>{user?.username}</h2>
          </div>
          <span className="ml-auto pr-2 font-poppins text-sm text-gray dark:text-silver">
            {getDate()}
          </span>
        </div>
        <div className="flex w-full select-none items-center border-b border-silver font-poppins text-sm dark:border-gray">
          <Link
            className={`cursor-pointer p-4 hover:text-tea-rose ${
              loc.endsWith("/manage-videos") ||
              loc.endsWith("dashboard/") ||
              loc.endsWith("dashboard")
                ? "text-tea-rose"
                : ""
            }`}
            to="/dashboard/manage-videos"
          >
            <span>Manage Videos</span>
          </Link>
          <Link
            className={`cursor-pointer p-4 hover:text-tea-rose ${
              loc.endsWith("/liked-videos") ? "text-tea-rose" : ""
            }`}
            to="/dashboard/liked-videos"
          >
            <span>Liked Videos</span>
          </Link>
          <Link
            className={`cursor-pointer p-4 hover:text-tea-rose ${
              loc.endsWith("/settings") ? "text-tea-rose" : ""
            }`}
            to="/dashboard/settings"
          >
            <span>Settings</span>
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
