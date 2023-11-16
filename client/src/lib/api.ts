export const themeKey = "theme";
export const tokenKey = "user-jwt";

export type Action = "sign-in" | "register";

export type Theme = "light" | "dark";

export type User = {
  userId: number;
  username: string;
  photoUrl: string;
};
export type Auth = {
  user: User;
  token: string;
};

export function readTheme(): Theme {
  let theme: Theme;
  const localTheme = localStorage.getItem(themeKey);
  if (localTheme) {
    theme = localTheme as Theme;
  } else {
    theme = "light";
  }
  return theme;
}

export function writeTheme(theme: Theme): void {
  localStorage.setItem(themeKey, theme);
}

export async function signIn(
  username: string,
  password: string,
): Promise<Auth> {
  return await signUpOrIn("sign-in", username, password);
}

export async function signUp(
  username: string,
  password: string,
): Promise<Auth> {
  return await signUpOrIn("register", username, password);
}

async function signUpOrIn(action: Action, username: string, password: string) {
  const req = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  };
  const res = await fetch(`/api/auth/${action}`, req);
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
  return await res.json();
}
