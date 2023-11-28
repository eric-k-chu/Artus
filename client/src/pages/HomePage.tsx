import { useTitle, useVideos } from "../lib";
import { VideoCard, ErrorNotice, VideoCardLoading } from "../components";
import { TbFolderQuestion } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useApp } from "../lib";

export function HomePage() {
  const { videos, isLoading, error } = useVideos();
  const { user } = useApp();
  useTitle("Home");

  if (isLoading) {
    return (
      <main className="flex h-full flex-wrap justify-center gap-8 overflow-y-auto p-8">
        <VideoCardLoading />
      </main>
    );
  }

  if (error) {
    return <ErrorNotice error={error} />;
  }

  if (videos.length < 1) {
    return (
      <main className="container flex flex-col items-center font-poppins">
        <TbFolderQuestion size={40} className="mt-60" />
        <h2 className="my-8 font-semibold leading-8">
          There are no videos in the database.
        </h2>
        <Link
          to={user ? "/upload" : "/sign-in"}
          className="rounded-md bg-l-p p-2 text-black shadow-md dark:bg-d-p"
        >
          Upload a Video
        </Link>
      </main>
    );
  }

  return (
    <main className="flex h-full flex-wrap justify-center gap-8 overflow-y-auto p-8">
      {videos.map((n) => (
        <VideoCard video={n} key={n.videoId} />
      ))}
    </main>
  );
}
