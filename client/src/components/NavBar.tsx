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

  const iconHover =
    "flex h-8 w-8 items-center justify-center rounded-md transition-none hover:cursor-pointer hover:bg-silver dark:hover:bg-void";
  return (
    <>
      <div className="flex w-full basis-1/12 items-center justify-between border-b-thin border-silver px-4 dark:border-gray">
        <Logo />
        <div className="flex basis-1/2 items-center justify-end gap-x-2">
          <div onClick={handleVideoUploadClick} className={iconHover}>
            <RiVideoUploadFill
              className="text-black dark:text-white"
              size={24}
            />
          </div>
          <div className={iconHover}>
            <Menu />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
