import { useEffect, useState } from "react";
import { PageAccordion } from "../components/PageAccordion";
import { PageIndicators, VideosContext } from "../components";
import { breakIntoSubArr, fetchUserVideos, useTitle, type Video } from "../lib";

export function Dashboard() {
  const [videos, setVideos] = useState<Video[][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<unknown>();
  const [currentPage, setCurrentPage] = useState(0);
  useTitle("Dashboard");

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

  const contextValues = { videos, setVideos };

  return (
    <VideosContext.Provider value={contextValues}>
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 overflow-y-auto p-8">
        {videos[currentPage] && <PageAccordion videos={videos[currentPage]} />}
        <PageIndicators
          arr={videos}
          currentPage={currentPage}
          onSelect={setCurrentPage}
        />
      </div>
    </VideosContext.Provider>
  );
}
