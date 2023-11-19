import { Route, Routes } from "react-router-dom";
import { NavBar, AppContext } from "./components";
import { useEffect, useLayoutEffect, useState } from "react";
import { HomePage, AuthPage, UploadPage, Dashboard } from "./pages";
import {
  type Auth,
  type Theme,
  type User,
  readTheme,
  writeTheme,
  themeKey,
  tokenKey,
} from "./lib";

export default function App() {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [theme, setTheme] = useState<Theme>();

  useLayoutEffect(() => {
    const th = readTheme();
    document.documentElement.className = th;
    localStorage.setItem(themeKey, th);
    setTheme(th);
  }, [theme]);

  useEffect(() => {
    const auth = localStorage.getItem(tokenKey);
    if (auth) {
      const a = JSON.parse(auth);
      setUser(a.user);
      setToken(a.token);
    }
  }, []);

  function handleSignIn(auth: Auth): void {
    localStorage.setItem(tokenKey, JSON.stringify(auth));
    setUser(auth.user);
    setToken(auth.token);
  }

  function handleSignOut(): void {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
    setToken(undefined);
  }

  function handleSetTheme(theme: Theme): void {
    setTheme(theme);
    writeTheme(theme);
  }

  const contextValue = {
    user,
    token,
    theme,
    handleSignIn,
    handleSignOut,
    handleSetTheme,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <main className="flex h-screen w-screen flex-col items-center bg-cream text-black transition-colors dark:bg-outer-space dark:text-white">
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<HomePage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/sign-in" element={<AuthPage action="sign-in" />} />
          <Route path="/register" element={<AuthPage action="register" />} />
        </Routes>
      </main>
    </AppContext.Provider>
  );
}
