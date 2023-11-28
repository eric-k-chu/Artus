import { useApp } from "../lib";
import { IoMoon, IoSunny } from "react-icons/io5";

export function ThemeToggler() {
  const { theme, handleSetTheme } = useApp();

  return (
    <button
      type="button"
      className="flex h-5 w-10 items-center rounded-full bg-l-bg-3 ring-1 ring-silver dark:bg-d-bg-12dp dark:ring-black lg:h-6 lg:w-12"
      onClick={() => handleSetTheme(theme === "light" ? "dark" : "light")}
    >
      <div
        className={`transition-transform ${
          theme === "light" ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tl from-[#34073d] to-[#ef745c] text-black dark:from-[#392d69] dark:to-[#b57bee] lg:h-6 lg:w-6">
          {theme === "light" ? (
            <IoSunny className="text-white/90" />
          ) : (
            <IoMoon className="text-black" />
          )}
        </div>
      </div>
    </button>
  );
}
/*
  return (
    <button
      type="button"
      className={className}
      onClick={() => handleSetTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <IoMoon size={22} /> : <IoSunny size={22} />}
    </button>
  );

*/
