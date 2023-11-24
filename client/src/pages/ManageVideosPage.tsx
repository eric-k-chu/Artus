import { useEffect, useState } from "react";
import { Video, breakIntoSubArr, fetchUserVideos } from "../lib";
import { PageIndicators } from "../components";

export function ManageVideosPage() {
  const [videos, setVideos] = useState<Video[][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<unknown>();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const vids = await fetchUserVideos();
        setVideos(breakIntoSubArr(3, vids));
      } catch (err) {
        console.log(error);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoading === undefined) load();
  }, [isLoading]);

  return (
    <div className="space-y-2 self-end p-4">
      <PageIndicators
        arr={videos}
        currentPage={currentPage}
        onSelect={setCurrentPage}
      />
    </div>
  );
}

/* <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 overflow-y-auto p-8">
        {videos[currentPage] && <PageAccordion videos={videos[currentPage]} />}
        <PageIndicators
          arr={videos}
          currentPage={currentPage}
          onSelect={setCurrentPage}
        />
      </div> */
