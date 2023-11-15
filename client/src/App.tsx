import { useLayoutEffect, useState } from "react";
import { ThemeContext } from "./components/ThemeContext";
import { NavBar } from "./components/NavBar";
import { Theme, readTheme, writeTheme } from "./lib/api";

export default function App() {
  const [theme, setTheme] = useState(readTheme());

  useLayoutEffect(() => {
    document.documentElement.className = theme;
    localStorage.theme = theme;
    document.title = "Artus";
  }, [theme]);

  function handleSetTheme(theme: Theme): void {
    setTheme(theme);
    writeTheme(theme);
  }

  const contextValue = { theme, handleSetTheme };

  return (
    <ThemeContext.Provider value={contextValue}>
      <main className="flex h-screen w-screen flex-col items-center bg-white text-black dark:bg-outer-space dark:text-white">
        <NavBar />
      </main>
    </ThemeContext.Provider>
  );
}
