import { useEffect, useState } from "react";
import { UserVideoCard } from "../components";
import { fetchUserVideos, useTitle, type Video, type User } from "../lib";

export function Dashboard() {
  const [videos, setVideos] = useState<Partial<Video & User>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<unknown>();

  useTitle("Dashboard");

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const vids = await fetchUserVideos();
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
        <span>Error loading videos: </span>
        {error instanceof Error ? error.message : "Unknown Error"}
      </div>
    );
  }

  return (
    <div className="container flex h-full w-full flex-col items-center justify-center">
      {videos.map((n) => (
        <UserVideoCard key={n.videoId} video={n} />
      ))}
    </div>
  );
}
