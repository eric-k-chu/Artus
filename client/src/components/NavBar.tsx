import { Logo } from "./Logo";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "./Menu";
import { RiVideoUploadFill } from "react-icons/ri";
import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";

export function NavBar() {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!user && pathname !== "/") navigate("/sign-in");
  }, [user, navigate, pathname]);

  function handleVideoUploadClick(): void {
    if (user) navigate("/upload");
    else navigate("/sign-in");
  }

  return (
    <>
      <div className="flex w-full basis-1/12 items-center justify-between border-b-thin border-silver p-4 dark:border-void">
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
