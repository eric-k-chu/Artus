import { MenuItem, Logo, NavIcon } from "./";
import { useNavigate } from "react-router-dom";
import { GITHUB_LINK, LINKEDIN_LINK } from "../lib";
import { useState, KeyboardEvent } from "react";
import { useApp } from "../lib";
import {
  IoPersonAdd,
  IoMenu,
  IoClose,
  IoLogoGithub,
  IoLogoLinkedin,
} from "react-icons/io5";
import {
  RiFolderVideoFill,
  RiAccountBoxFill,
  RiLogoutBoxFill,
  RiLoginBoxFill,
} from "react-icons/ri";

export function Menu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, handleSignOut } = useApp();

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>): void {
    if (e.key === "Escape") setIsOpen(false);
  }

  function handleNavigate(page: string): void {
    if (page === "/") {
      handleSignOut();
    }
    navigate(page);
    setIsOpen(false);
  }

  return (
    <section onKeyDown={handleKeyDown} tabIndex={0}>
      <NavIcon>
        <IoMenu
          className="h-6 w-6 lg:h-8 lg:w-8"
          onClick={() => setIsOpen(!isOpen)}
        />
      </NavIcon>
      <div
        className={`fixed inset-0 z-50 ${
          isOpen
            ? "bg-slate-900/25 backdrop-blur-sm dark:bg-black/25"
            : "pointer-events-none bg-transparent backdrop-blur-none"
        } transition duration-[300ms] ease-in-out`}
      >
        <div
          className={`flex h-full items-start justify-end transition-transform duration-[300ms] ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="min-h-full w-full" onClick={() => setIsOpen(false)} />
          <menu className="flex min-h-full min-w-[20rem] flex-col bg-l-bg-1 shadow-lg dark:bg-d-bg-03dp">
            <li
              key={0}
              className="flex items-center justify-between border-b border-silver p-6 dark:border-d-bg-12dp"
            >
              {user ? (
                <section className="flex flex-col">
                  <span className="font-poppins text-xs text-gray dark:text-white/60">
                    Signed in as
                  </span>
                  <h2 className="font-poppins">{user.username}</h2>
                </section>
              ) : (
                <Logo />
              )}
              <NavIcon>
                <IoClose size={24} onClick={() => setIsOpen(false)} />
              </NavIcon>
            </li>
            <MenuItem
              key={1}
              show={user !== undefined}
              onClick={() => handleNavigate(`/users/${user?.userId}`)}
            >
              <RiAccountBoxFill size={24} />
              <span>Profile</span>
            </MenuItem>
            <MenuItem
              key={2}
              show={user !== undefined}
              onClick={() => handleNavigate("/dashboard/manage-videos")}
            >
              <RiFolderVideoFill size={24} />
              <span>Dashboard</span>
            </MenuItem>
            <MenuItem
              key={3}
              show={true}
              onClick={() => handleNavigate(user ? "/" : "/sign-in")}
            >
              {user ? (
                <RiLogoutBoxFill size={24} />
              ) : (
                <RiLoginBoxFill size={24} />
              )}
              <span>{user ? "Sign Out" : "Sign In"}</span>
            </MenuItem>
            <MenuItem
              key={4}
              show={user === undefined}
              onClick={() => handleNavigate("/register")}
            >
              <IoPersonAdd size={24} />
              <span>Register</span>
            </MenuItem>
            <li
              key={5}
              className="mt-auto flex items-center gap-x-8 border-t border-silver p-6 dark:border-d-bg-12dp"
            >
              <a href={GITHUB_LINK} target="_blank">
                <IoLogoGithub size={24} />
              </a>
              <a href={LINKEDIN_LINK} target="_blank">
                <IoLogoLinkedin size={24} />
              </a>
            </li>
          </menu>
        </div>
      </div>
    </section>
  );
}
