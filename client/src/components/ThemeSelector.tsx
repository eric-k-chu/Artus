import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export function ThemeSelector() {
  const { theme, handleSetTheme } = useContext(ThemeContext);

  const newTheme = theme === "light" ? "dark" : "light";

  if (theme === "light") {
    return (
      <IoSunnyOutline
        size={16}
        onClick={() => handleSetTheme(newTheme)}
        className="mt-1 hover:cursor-pointer"
      />
    );
  }

  return (
    <IoMoonOutline
      size={16}
      onClick={() => handleSetTheme(newTheme)}
      className="mt-1 hover:cursor-pointer"
    />
  );
}
