import { IoPerson, IoMoon, IoSunny, IoPersonAdd } from "react-icons/io5";
import { AppContext } from "./AppContext";
import { useState, useContext } from "react";
import {
  RiFolderVideoFill,
  RiAccountBoxFill,
  RiLogoutBoxFill,
  RiLoginBoxFill,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export function AppDrawer() {
  const navigate = useNavigate();
  const [showSideBar, setShowSideBar] = useState(false);
  const { user, theme, handleSetTheme, handleSignOut } = useContext(AppContext);

  function handleSignInOrOut(): void {
    if (!user) navigate("/sign-in");
    handleSignOut();
  }

  return (
    <div className="relative">
      {!user ? (
        <IoPersonAdd
          className="animate-pulse hover:cursor-pointer"
          size={24}
          onClick={() => setShowSideBar(!showSideBar)}
        />
      ) : (
        <IoPerson
          className="text-green-400 hover:cursor-pointer"
          size={24}
          onClick={() => setShowSideBar(!showSideBar)}
        />
      )}
      {showSideBar && (
        <div className="absolute right-8 top-0 flex h-96 w-48 flex-col items-center rounded-xl bg-white py-3 shadow-2xl dark:bg-void">
          {user && (
            <div className="flex w-full basis-1/12 items-center gap-x-4 px-6 py-2 transition-none hover:cursor-pointer hover:bg-black/10">
              <RiAccountBoxFill size={24} />
              <span>Profile</span>
            </div>
          )}
          {user && (
            <div className="flex w-full basis-1/12 items-center gap-x-4 px-6 py-2 transition-none hover:cursor-pointer hover:bg-black/10">
              <RiFolderVideoFill size={24} />
              <span>Manage</span>
            </div>
          )}
          <div
            className="flex w-full basis-1/12 items-center gap-x-4 px-6 py-2 transition-none hover:cursor-pointer hover:bg-black/10"
            onClick={handleSignInOrOut}
          >
            {user ? (
              <RiLogoutBoxFill size={24} />
            ) : (
              <RiLoginBoxFill size={24} />
            )}
            <span>{user ? "Sign Out" : "Sign In"}</span>
          </div>
          {!user && (
            <div
              className="flex w-full basis-1/12 items-center gap-x-4 px-6 py-2 transition-none hover:cursor-pointer hover:bg-black/10"
              onClick={() => navigate("/register")}
            >
              <IoPersonAdd size={24} />
              <span>Register</span>
            </div>
          )}
          <div
            className="flex w-full basis-1/12 items-center gap-x-4 px-6 py-2 transition-none hover:cursor-pointer hover:bg-black/10"
            onClick={() => handleSetTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <IoMoon size={24} /> : <IoSunny size={24} />}
            <span>{theme === "light" ? "Light" : "Dark"}</span>
          </div>
        </div>
      )}
    </div>
  );
}
