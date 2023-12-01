import { createContext } from "react";
import { type Auth, type User, type Theme } from "../lib";

type AppContextValues = {
  user: User | undefined;
  token: string | undefined;
  theme: Theme | undefined;
  form: FormData | undefined;
  files: any;
  handleSetFiles: (files: any[]) => void;
  handleSignIn: (auth: Auth) => void;
  handleSignOut: () => void;
  handleSetTheme: (theme: Theme) => void;
  handleSetForm: (form: FormData | undefined) => void;
};

export const AppContext = createContext<AppContextValues>({
  user: undefined,
  token: undefined,
  theme: undefined,
  form: undefined,
  files: undefined,
  handleSetFiles: () => undefined,
  handleSignIn: () => undefined,
  handleSignOut: () => undefined,
  handleSetTheme: () => undefined,
  handleSetForm: () => undefined,
});
