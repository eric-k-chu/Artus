import { Logo } from "./Logo";
import { Outlet } from "react-router-dom";
import { UserAccount } from "./UserAccount";
import { IoSearchOutline } from "react-icons/io5";

export function NavBar() {
  const iconHover =
    "flex h-8 w-8 items-center justify-center rounded-md transition-none hover:cursor-pointer hover:bg-silver dark:hover:bg-void";
  return (
    <>
      <div className="flex w-full basis-1/12 items-center justify-between border-b-thin border-silver px-4 dark:border-gray">
        <Logo />
        <div className="flex basis-1/2 items-center justify-end gap-x-2">
          <div className={iconHover}>
            <IoSearchOutline className="text-black dark:text-white" size={24} />
          </div>
          <div className={iconHover}>
            <UserAccount />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
