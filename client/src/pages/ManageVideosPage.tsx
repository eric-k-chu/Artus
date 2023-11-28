import { useState } from "react";
import { useUserVideos } from "../lib";
import { LoadingCircle, PageIndicators, UserVideoCard } from "../components";
import { Link } from "react-router-dom";

export function ManageVideosPage() {
  const { videos, isLoading, error } = useUserVideos();
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
          Upload a video to get started!
        </h3>
        <Link
          to="/upload"
          className="rounded-md bg-l-p p-2 font-poppins text-white/90 dark:bg-d-p"
        >
          Upload
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
            url={`/dashboard/manage-videos/${n.videoId}`}
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
