import { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingCircle, PageIndicators, UserVideoCard } from "../components";
import { useLikedVideos } from "../lib";

export function LikedVideosPage() {
  const { videos, isLoading, error } = useLikedVideos();
  const [currentPage, setCurrentPage] = useState(0);

  if (isLoading) {
    return (
      <main role="status" className="flex h-60 items-center">
        <LoadingCircle />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex h-60 items-center">
        <span className="font-poppins text-red-600">
          {error instanceof Error ? error.message : "Unknown error."}
        </span>
      </main>
    );
  }

  if (videos.length < 1) {
    return (
      <main className="flex w-full flex-col items-center gap-y-4 rounded-md border border-l-brdr bg-l-bg-1 p-4 shadow-sm shadow-l-shdw dark:border-none dark:bg-d-bg-03dp dark:shadow-none">
        <h3 className="font-poppins text-gray dark:text-white/90">
          Your liked videos will be displayed here!
        </h3>
        <Link
          to="/home"
          className="rounded-md bg-l-p p-2 font-poppins text-white/90 dark:bg-d-p"
        >
          Browse Videos
        </Link>
      </main>
    );
  }
  return (
    <main className="flex w-full flex-col items-center gap-y-4 rounded-md border border-l-brdr bg-l-bg-1 p-4 shadow-sm shadow-l-shdw dark:border-none dark:bg-d-bg-03dp dark:shadow-none">
      {videos[currentPage] &&
        videos[currentPage].map((n) => (
          <UserVideoCard
            key={n.videoId}
            video={n}
            url={`/watch/${n.videoId}`}
          />
        ))}
      <PageIndicators
        arr={videos}
        currentPage={currentPage}
        onSelect={setCurrentPage}
      />
    </main>
  );
}
