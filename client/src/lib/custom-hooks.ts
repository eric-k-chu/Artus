import {
  Video,
  breakIntoSubArr,
  fetchUserVideos,
  fetchVideoById,
  fetchVideos,
} from ".";
import { useEffect, useLayoutEffect, useState } from "react";

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
