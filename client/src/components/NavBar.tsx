import { UserAccount } from "./UserAccount";
import { ThemeSelector } from "./ThemeSelector";
import { IoSearchOutline, IoPlayCircleOutline } from "react-icons/io5";

export function NavBar() {
  return (
    <div className="flex w-full basis-1/12 items-center justify-between border-b-thin border-silver px-4 dark:border-gray">
      <div className="flex basis-1/2 items-center gap-x-2">
        <IoPlayCircleOutline className="mt-1 text-aquamarine" size={32} />
        <h2 className="font-poppins text-2xl font-thin">artus</h2>
        <ThemeSelector />
      </div>
      <div className="flex basis-1/2 items-center justify-end gap-x-2">
        <IoSearchOutline className="text-black dark:text-white" size={24} />
        <UserAccount />
      </div>
    </div>
  );
}
