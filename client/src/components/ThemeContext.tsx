import { createContext } from "react";
import { Theme } from "../lib/api";

type ThemeContextValues = {
  theme: Theme;
  handleSetTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextValues>({
  theme: "light",
  handleSetTheme: () => undefined,
});
