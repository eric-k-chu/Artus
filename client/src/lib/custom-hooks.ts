import { useParams } from "react-router-dom";
import {
  Video,
  breakIntoSubArr,
  fetchUserLikedVideos,
  fetchUserProfile,
  fetchUserVideos,
  fetchVideoById,
  fetchVideos,
  isLiked,
} from ".";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AppContext } from "../components";

export function useTitle(title: string): void {
  useLayoutEffect(() => {
    document.title = title + " / Artus";
  }, [title]);
}

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const vids = await fetchVideos();
        setVideos(vids);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoading === undefined) load();
  }, [isLoading]);

  return { videos, isLoading, error };
}

export function useVideo(videoId: number) {
  const [video, setVideo] = useState<Video>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<unknown>();
  const [caption, setCaption] = useState<string>();
  const [tags, setTags] = useState<string>();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const vid = await fetchVideoById(videoId);
        setVideo(vid);
        setCaption(vid.caption);
        setTags(vid.tags.join(","));
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoading === undefined) load();
  }, [isLoading, videoId]);

  return { video, isLoading, error, caption, tags, setCaption, setTags };
}

export function useUserVideos() {
  const [videos, setVideos] = useState<Video[][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<unknown>();
  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const vids = await fetchUserVideos();
        setVideos(breakIntoSubArr(3, vids));
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoading === undefined) load();
  }, [isLoading]);

  return { videos, isLoading, error };
}

export function useLikedVideos() {
  const [videos, setVideos] = useState<Video[][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<unknown>();
  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const vids = await fetchUserLikedVideos();
        setVideos(breakIntoSubArr(3, vids));
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoading === undefined) load();
  }, [isLoading]);

  return { videos, isLoading, error };
}

export function useHasLiked(videoId: number | undefined) {
  const [hasLiked, setHasLiked] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function load() {
      try {
        const bool = await isLiked(videoId);
        setHasLiked(bool);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoading === undefined) load();
  });
  return { hasLiked, isLoading, error, setHasLiked };
}

export function useDebouncedQuery(query: string, timeout = 300): string {
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, timeout);
    return () => clearTimeout(timer);
  }, [query, timeout]);

  return debouncedQuery;
}

export function useUserProfile() {
  const { userId } = useParams();
  const [username, setUsername] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const userProfile = await fetchUserProfile(Number(userId));
        setUsername(userProfile.username);
        setVideos(userProfile.videos);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoading === undefined) load();
  }, [isLoading, userId]);

  return { username, videos, isLoading, error };
}

export function useApp() {
  return useContext(AppContext);
}
