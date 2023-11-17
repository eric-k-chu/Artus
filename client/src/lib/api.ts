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
export type Video = {
  videoId: number;
  userId: number;
  likes: number;
  caption: string;
  videoUrl: string;
  thumbnailUrl: string;
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

async function signUpOrIn(
  action: Action,
  username: string,
  password: string,
): Promise<Auth> {
  const req = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  };
  const res = await fetch(`/api/auth/${action}`, req);
  if (!res.ok) {
    switch (res.status) {
      case 401:
        throw new Error("invalid login credentials");
      case 404:
        throw new Error("user does not exist");
      case 409:
        throw new Error(`username already exists`);
      default:
        throw new Error(`an unexpected error has occured: ${res.status}`);
    }
  }
  return await res.json();
}

export async function getVideos(): Promise<Video[]> {
  const res = await fetch("/api/videos");
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
  return await res.json();
}

export async function uploadVideos(
  form: FormData,
  userId: number | undefined,
  token: string | undefined,
): Promise<any> {
  const req = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  };
  const res = await fetch(`/api/videos/${userId}`, req);
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
  return await res.json();
}
