import { Route, Routes } from "react-router-dom";
import { NavBar, AppContext } from "./components";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  HomePage,
  AuthPage,
  UploadPage,
  Dashboard,
  VideoDetails,
  ManageVideosPage,
  UserVideoPage,
  NotFound,
  LikedVideosPage,
  UserProfilePage,
  PendingPage,
} from "./pages";
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
  const [form, setForm] = useState<FormData>();
  const [isPending, setIsPending] = useState<boolean>();

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

  function handleSetForm(form: FormData | undefined): void {
    setForm(form);
  }

  function handleIsPending(bool: boolean): void {
    setIsPending(bool);
  }

  const contextValue = {
    user,
    token,
    theme,
    form,
    isPending,
    handleIsPending,
    handleSignIn,
    handleSignOut,
    handleSetTheme,
    handleSetForm,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-w-screen flex min-w-[330px] flex-col items-center">
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<HomePage />} />
            <Route path="watch/:videoId" element={<VideoDetails />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="dashboard/" element={<Dashboard />}>
              <Route path="pending" element={<PendingPage />} />
              <Route path="manage-videos" element={<ManageVideosPage />} />
              <Route path="liked-videos" element={<LikedVideosPage />} />
            </Route>
            <Route
              path="dashboard/manage-videos/:videoId"
              element={<UserVideoPage />}
            />
            <Route path="users/:userId" element={<UserProfilePage />} />
          </Route>
          <Route path="/sign-in" element={<AuthPage action="sign-in" />} />
          <Route path="/register" element={<AuthPage action="register" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
