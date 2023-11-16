import { createContext } from "react";
import { Auth, User, Theme } from "../lib/api";

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
