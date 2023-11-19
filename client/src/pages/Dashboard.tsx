import { useEffect, useState } from "react";
import { readVideos, useTitle, type Video } from "../lib";

export function Dashboard() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<unknown>();

  useTitle("Dashboard");

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
  }, [isLoading, videos]);

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

  return (
    <div className="container flex h-full w-full flex-col items-center justify-center">
      {videos.map((n) => (
        <div key={n.videoId}>{n.videoId}</div>
      ))}
    </div>
  );
}
