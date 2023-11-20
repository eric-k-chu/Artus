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
      <div className="flex w-full basis-1/12 items-center justify-between border-b border-silver p-4 dark:border-void">
        <Logo />
        <div className="flex basis-1/2 items-center justify-end gap-x-2">
          <RiVideoUploadFill
            className="h-8 w-10 rounded-md hover:cursor-pointer hover:bg-silver dark:hover:bg-void"
            size={24}
            onClick={handleVideoUploadClick}
          />
          <Menu />
        </div>
      </div>
      <Outlet />
    </>
  );
}
