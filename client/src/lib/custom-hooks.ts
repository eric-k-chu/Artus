import { useParams, useSearchParams } from "react-router-dom";
import {
  SearchResults,
  Video,
  breakIntoSubArr,
  fetchSearchResults,
  fetchSearchSuggestions,
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

export function useSearchSuggestions(query: string, timeout = 300) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query) {
        query.replace(/\+/g, " ");
        const res = await fetchSearchSuggestions(query);
        setSuggestions(res);
      } else {
        setSuggestions([]);
      }
    }, timeout);
    return () => clearTimeout(timer);
  }, [query, timeout]);

  return { suggestions };
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

export function useSearchQuery() {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<SearchResults>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function load() {
      console.log(searchParams.get("q"));
      const query = searchParams.get("q");
      if (query === null) return;
      setIsLoading(true);
      try {
        const res = await fetchSearchResults(query);
        setSearchResults(res);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoading === undefined) load();
  }, [searchParams, isLoading]);

  return { searchResults, isLoading, error };
}
