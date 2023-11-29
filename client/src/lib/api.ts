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
export type Video = User & {
  videoId: number;
  caption: string;
  likes: number;
  tags: string[];
  thumbnailUrl: string;
  videoUrl: string;
  uploadedAt: string;
  userId: number;
  username: string;
};
export type Tag = {
  tagId: number;
  tagName: string;
};
export type UpdateForm = {
  caption: string;
  tags: string;
};

function getToken() {
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
  const data = await res.json();
  if (!res.ok) throw new Error(`${data.error}`);
  return data;
}

export async function fetchVideos(): Promise<Video[]> {
  const res = await fetch("/api/videos/all");
  const data = await res.json();
  if (!res.ok) throw new Error(`${data.error}`);
  return data;
}

export async function fetchUserVideos(): Promise<Video[]> {
  const res = await fetch("/api/videos", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`${res.status}: ${data.error}`);
  return data;
}

export async function fetchUserLikedVideos(): Promise<Video[]> {
  const res = await fetch("/api/dashboard/liked-videos", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`${res.status}: ${data.error}`);
  return data;
}

export async function fetchVideoById(videoId: number): Promise<Video> {
  const res = await fetch(`/api/videos/${videoId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(`${res.status}: ${data.error}`);
  return data;
}

export async function uploadVideos(form: FormData): Promise<Video[]> {
  const req = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: form,
  };
  const res = await fetch(`/api/videos`, req);
  const data = await res.json();
  if (!res.ok) throw new Error(`${res.status}: ${data.error}`);
  return data;
}

export function getDate(ttz?: string): string {
  const date = ttz ? new Date(ttz) : new Date();
  return date.toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function updateVideo(
  videoId: number | undefined,
  caption: string | undefined,
  tags: string | undefined,
): Promise<Video> {
  const res = await fetch(`/api/dashboard/manage-videos/${videoId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      caption: caption,
      tags: tags ? tags.split(",") : [],
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`${res.status}: ${data.error}`);
  return data;
}

export function breakIntoSubArr<T>(chunkSize: number, arr: T[]): T[][] {
  if (chunkSize < 1) throw new Error("size has to be greater than 1");
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}

export async function deleteVideo(videoId: number): Promise<void> {
  const res = await fetch(`/api/dashboard/manage-videos/${videoId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`${res.status}: ${err.error}`);
  }
}

export async function incrementLikes(videoId: number): Promise<void> {
  const res = await fetch(`/api/videos/${videoId}/inc`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`${res.status}: ${err.error}`);
  }
}

export async function decrementLikes(videoId: number): Promise<void> {
  const res = await fetch(`/api/videos/${videoId}/dec`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`${res.status}: ${err.error}`);
  }
}

export async function isLiked(videoId: number | undefined): Promise<boolean> {
  const res = await fetch(`/api/videos/likes/${videoId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`${res.status}: ${data.error}`);
  return data;
}

export async function debounce<T extends (...args: T[]) => void>(
  cb: T,
  timeout = 200,
) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => cb(...args), timeout);
  };
}

interface UserProfile {
  username: string;
  videos: Video[];
}

export async function fetchUserProfile(userId: number): Promise<UserProfile> {
  const res = await fetch(`/api/users/${userId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(`${res.status}: ${data.error}`);
  return data;
}

export type UserResult = {
  username: string;
};

export type VideosResult = {
  caption: string;
};

export type TagsResult = {
  name: string;
};

export interface SearchSuggestions {
  users: UserResult[];
  videos: VideosResult[];
  tags: TagsResult[];
}

export interface SearchResults {
  users: UserResult[];
  videos: Video[];
}

export async function fetchSearchSuggestions(
  query: string,
): Promise<SearchSuggestions> {
  const res = await fetch(`/api/search/suggestions?q=${query}`);
  const data = await res.json();
  if (!res.ok) throw new Error(`${res.status}: ${data.error}`);
  return data;
}

export async function fetchSearchResults(
  query: string,
): Promise<SearchResults> {
  const res = await fetch(`/api/search/results?q=${query}`);
  const data = await res.json();
  if (!res.ok) throw new Error(`${res.status}: ${data.error}`);
  return data;
}
