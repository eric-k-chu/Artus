import { VideoCard } from "../components";
import { useEffect, useState } from "react";
import { useTitle, fetchVideos, type Video } from "../lib";

export function HomePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<unknown>();

  useTitle("Home");

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
    <div className="flex h-full flex-wrap justify-center gap-8 overflow-y-auto p-8">
      {videos.map((n) => (
        <VideoCard video={n} key={n.videoId} />
      ))}
    </div>
  );
}
