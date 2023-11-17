import { Logo } from "./Logo";
import { Link, Outlet } from "react-router-dom";
import { AppDrawer } from "./AppDrawer";
import { RiVideoUploadFill } from "react-icons/ri";

export function NavBar() {
  const iconHover =
    "flex h-8 w-8 items-center justify-center rounded-md transition-none hover:cursor-pointer hover:bg-silver dark:hover:bg-void";
  return (
    <>
      <div className="flex w-full basis-1/12 items-center justify-between border-b-thin border-silver px-4 dark:border-gray">
        <Logo />
        <div className="flex basis-1/2 items-center justify-end gap-x-2">
          <Link to="/upload" className={iconHover}>
            <RiVideoUploadFill
              className="text-black dark:text-white"
              size={24}
            />
          </Link>
          <div className={iconHover}>
            <AppDrawer />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
