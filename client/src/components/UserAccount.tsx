import { useState } from "react";
import { IoPerson } from "react-icons/io5";
import {
  RiFolderVideoFill,
  RiAccountBoxFill,
  RiLogoutBoxFill,
} from "react-icons/ri";

export function UserAccount() {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <div className="relative">
      <IoPerson
        className="text-black hover:cursor-pointer dark:text-white"
        size={24}
        onClick={() => setShowSideBar(!showSideBar)}
      />
      {showSideBar && (
        <div className="absolute right-8 top-0 flex h-96 w-48 flex-col items-center rounded-xl bg-white py-3 shadow-2xl dark:bg-void">
          <div className="flex w-full basis-1/12 items-center gap-x-4 px-6 py-2 transition-none hover:cursor-pointer hover:bg-black/10">
            <RiAccountBoxFill size={24} />
            <span>Profile</span>
          </div>
          <div className="flex w-full basis-1/12 items-center gap-x-4 px-6 py-2 transition-none hover:cursor-pointer hover:bg-black/10">
            <RiFolderVideoFill size={24} />
            <span>Manage</span>
          </div>
          <div className="flex w-full basis-1/12 items-center gap-x-4 px-6 py-2 transition-none hover:cursor-pointer hover:bg-black/10">
            <RiLogoutBoxFill size={24} />
            <span>Sign Out</span>
          </div>
        </div>
      )}
    </div>
  );
}
