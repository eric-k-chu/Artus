import { useEffect, useState } from "react";
import { useTitle, readVideos, type Video } from "../lib";

export function HomePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<unknown>();

  useTitle("Home");

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const vids = await readVideos();
        setVideos(vids);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoading === undefined) load();
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="container flex h-full flex-col items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container flex h-full flex-col items-center justify-center">
        Error loading videos:
        {error instanceof Error ? error.message : "Unknown Error"}
      </div>
    );
  }

  if (videos.length < 1) {
    return (
      <div className="container flex h-full flex-col items-center justify-center">
        No videos created
      </div>
    );
  }

  return (
    <div className="container flex h-full flex-col items-center justify-center">
      <h1>Videos</h1>
      {videos.map((n) => (
        <div key={n.videoId}>{n.videoId}</div>
      ))}
      <img src="/images/artus-dark.png" />
    </div>
  );
}
