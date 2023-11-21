export const themeKey = "theme";
export const tokenKey = "user-jwt";
export const GITHUB_LINK = "https://github.com/eric-k-chu";
export const LINKEDIN_LINK = "https://www.linkedin.com/in/eric-k-chu/";

export type Action = "sign-in" | "register";
export type Theme = "light" | "dark";

export type User = {
  userId: number;
  username: string;
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
  uploadedAt: string;
};
export type VideoDetails = {
  video: Video & User;
  tags: string[];
};

function getToken(): any {
  const tokenJSON = localStorage.getItem(tokenKey);
  if (!tokenJSON) throw new Error("Unable to retrieve token. Please relog.");
  const userJwt = JSON.parse(tokenJSON);
  return userJwt.token;
}

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
        throw new Error("Login verification failed.");
      case 404:
        throw new Error("These credentials do not match our records.");
      case 409:
        throw new Error(`This username is already taken.`);
      default:
        throw new Error(`an unexpected error has occured: ${res.status}`);
    }
  }
  return await res.json();
}

export async function fetchVideos(): Promise<Video[]> {
  const res = await fetch("/api/videos/all");
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchUserVideos(): Promise<Video[]> {
  const res = await fetch("/api/videos", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchVideoDetails(
  videoId: number,
): Promise<VideoDetails> {
  const res = await fetch(`/api/videos/${videoId}`);
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
  return await res.json();
}

export async function uploadVideos(form: FormData): Promise<Video> {
  const req = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: form,
  };
  const res = await fetch(`/api/videos`, req);
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
  return await res.json();
}

export function getDate(ttz: string | undefined): string {
  if (!ttz) throw new Error("Error in getting date");
  return new Date(ttz).toLocaleString("default", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}

export async function updateVideo(
  videoId: number | undefined,
  caption: string | undefined,
): Promise<VideoDetails> {
  const req = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      caption: caption,
      tags: [],
    }),
  };
  const res = await fetch(`/api/videos/${videoId}`, req);
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  return await res.json();
}
