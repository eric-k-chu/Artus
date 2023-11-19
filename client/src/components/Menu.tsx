import { IoMoon, IoSunny, IoPersonAdd, IoMenu, IoClose } from "react-icons/io5";
import { AppContext } from "./AppContext";
import { useState, useContext } from "react";
import {
  RiFolderVideoFill,
  RiAccountBoxFill,
  RiLogoutBoxFill,
  RiLoginBoxFill,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "./MenuItem";

export function Menu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, theme, handleSetTheme, handleSignOut } = useContext(AppContext);

  function handleSignInOrOut(): void {
    if (!user) navigate("/sign-in");
    else handleSignOut();
  }

  return (
    <>
      <IoMenu
        className="h-8 w-8 rounded-md hover:cursor-pointer hover:bg-silver dark:hover:bg-black/10"
        size={24}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div
        className={`fixed inset-0 z-50 ${
          isOpen
            ? "bg-slate-900/25 backdrop-blur-sm dark:bg-void/50"
            : "pointer-events-none bg-transparent backdrop-blur-none"
        } transition duration-[400ms] ease-in-out`}
      >
        <div
          className={`flex h-full items-start justify-end transition-transform duration-[400ms] ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex min-h-full w-[min(20rem,calc(100vw-theme(spacing.10)))] flex-col bg-cream shadow-lg dark:bg-outer-space">
            <div className="flex items-center justify-between border-b-thin border-silver p-6 dark:border-gray">
              <span className="font-poppins">artus</span>
              <IoClose
                className="h-7 w-7 rounded-md hover:cursor-pointer hover:bg-silver dark:hover:bg-black/10"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <MenuItem show={user !== undefined}>
              <RiAccountBoxFill size={24} />
              <span>Profile</span>
            </MenuItem>
            <MenuItem
              show={user !== undefined}
              onClick={() => navigate("/dashboard")}
            >
              <RiFolderVideoFill size={24} />
              <span>Dashboard</span>
            </MenuItem>
            <MenuItem show={true} onClick={handleSignInOrOut}>
              {user ? (
                <RiLogoutBoxFill size={24} />
              ) : (
                <RiLoginBoxFill size={24} />
              )}
              <span>{user ? "Sign Out" : "Sign In"}</span>
            </MenuItem>
            <MenuItem
              show={user === undefined}
              onClick={() => navigate("/register")}
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
    </>
  );
}
