import { useContext } from "react";
import { Logo, AppContext, Menu } from "./";
import { RiVideoUploadFill } from "react-icons/ri";
import { Outlet, useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  function handleVideoUploadClick(): void {
    if (user) navigate("/upload");
    else navigate("/sign-in");
  }

  return (
    <>
      <header className="flex w-full basis-1/12 items-center justify-between border border-l-brdr bg-l-bg-1 p-4 shadow-sm shadow-l-shdw dark:border-none dark:bg-d-bg-01dp dark:shadow-none">
        <Logo />
        <div className="flex basis-1/2 items-center justify-end gap-x-2">
          <RiVideoUploadFill
            className="h-8 w-10 hover:cursor-pointer"
            size={24}
            onClick={handleVideoUploadClick}
          />
          <Menu />
        </div>
      </header>
      <Outlet />
    </>
  );
}
