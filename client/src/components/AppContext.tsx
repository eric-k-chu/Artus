import { createContext } from "react";
import { type Auth, type User, type Theme } from "../lib";

type AppContextValues = {
  user: User | undefined;
  token: string | undefined;
  theme: Theme | undefined;
  handleSignIn: (auth: Auth) => void;
  handleSignOut: () => void;
  handleSetTheme: (theme: Theme) => void;
};

export const AppContext = createContext<AppContextValues>({
  user: undefined,
  token: undefined,
  theme: undefined,
  handleSignIn: () => undefined,
  handleSignOut: () => undefined,
  handleSetTheme: () => undefined,
});
