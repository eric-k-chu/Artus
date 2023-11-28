import { Logo, Menu, SearchBar } from "./";
import { Outlet, useNavigate } from "react-router-dom";
import { RiVideoAddLine } from "react-icons/ri";
import { ThemeToggler } from "./";
import { useApp } from "../lib";

export function NavBar() {
  const navigate = useNavigate();
  const { user } = useApp();

  function handleVideoUploadClick(): void {
    if (user) navigate("/upload");
    else navigate("/sign-in");
  }

  return (
    <>
      <header className="flex w-full basis-1/12 items-center justify-between border border-l-brdr bg-l-bg-1 p-4 shadow-sm shadow-l-shdw dark:border-none dark:bg-d-bg-01dp dark:shadow-none">
        <div className="flex basis-1/2 items-center gap-x-4">
          <Logo />
          <button
            className="flex items-center gap-x-2 rounded-sm bg-l-p px-2 py-1 font-poppins text-xs text-white/90 shadow-sm dark:bg-d-p lg:text-sm"
            onClick={handleVideoUploadClick}
          >
            <RiVideoAddLine />
            Upload
          </button>
        </div>
        <div className="flex basis-1/2 items-center justify-end gap-x-2 lg:gap-x-6">
          <SearchBar />
          <ThemeToggler />
          <Menu />
        </div>
      </header>
      <Outlet />
    </>
  );
}
