import { MenuItem, AppContext } from "./";
import { useNavigate } from "react-router-dom";
import { useState, useContext, KeyboardEvent } from "react";
import { IoMoon, IoSunny, IoPersonAdd, IoMenu, IoClose } from "react-icons/io5";
import {
  RiFolderVideoFill,
  RiAccountBoxFill,
  RiLogoutBoxFill,
  RiLoginBoxFill,
} from "react-icons/ri";

export function Menu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, theme, handleSetTheme, handleSignOut } = useContext(AppContext);

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>): void {
    if (e.key === "Escape") setIsOpen(false);
  }

  function handleNavigate(
    page: "/dashboard" | "/register" | "/sign-in" | "/",
  ): void {
    if (page === "/") {
      handleSignOut();
    }
    navigate(page);
    setIsOpen(false);
  }

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <IoMenu
        className="h-8 w-8 rounded-md hover:cursor-pointer hover:bg-silver dark:hover:bg-void"
        size={24}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div
        className={`fixed inset-0 z-50 ${
          isOpen
            ? "bg-slate-900/25 backdrop-blur-sm dark:bg-black/25"
            : "pointer-events-none bg-transparent backdrop-blur-none"
        } transition duration-[400ms] ease-in-out`}
      >
        <div
          className={`flex h-full items-start justify-end transition-transform duration-[400ms] ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="min-h-full w-full" onClick={() => setIsOpen(false)} />
          <div className="flex min-h-full min-w-[20rem] flex-col bg-cream shadow-lg dark:bg-outer-space">
            <div className="border-b-thin flex items-center justify-between border-silver p-6 dark:border-void">
              <span className="font-poppins">artus</span>
              <IoClose
                className="h-7 w-7 rounded-md hover:cursor-pointer hover:bg-silver dark:hover:bg-void"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <MenuItem show={user !== undefined}>
              <RiAccountBoxFill size={24} />
              <span>Profile</span>
            </MenuItem>
            <MenuItem
              show={user !== undefined}
              onClick={() => handleNavigate("/dashboard")}
            >
              <RiFolderVideoFill size={24} />
              <span>Dashboard</span>
            </MenuItem>
            <MenuItem
              show={true}
              onClick={() => handleNavigate(user ? "/sign-in" : "/")}
            >
              {user ? (
                <RiLogoutBoxFill size={24} />
              ) : (
                <RiLoginBoxFill size={24} />
              )}
              <span>{user ? "Sign Out" : "Sign In"}</span>
            </MenuItem>
            <MenuItem
              show={user === undefined}
              onClick={() => handleNavigate("/register")}
            >
              <IoPersonAdd size={24} />
              <span>Register</span>
            </MenuItem>
            <MenuItem
              show={true}
              isLast={true}
              onClick={() =>
                handleSetTheme(theme === "light" ? "dark" : "light")
              }
            >
              {theme === "light" ? <IoMoon size={24} /> : <IoSunny size={24} />}
              <span>{theme === "light" ? "Light" : "Dark"}</span>
            </MenuItem>
          </div>
        </div>
      </div>
    </div>
  );
}
