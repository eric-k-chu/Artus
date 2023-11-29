import { TbFolderQuestion } from "react-icons/tb";
import { VideoCardLoading, ErrorNotice, VideoCard } from "../components";
import { useTitle, useSearchQuery } from "../lib";

export function SearchPage() {
  const { searchResults, isLoading, error } = useSearchQuery();
  useTitle("Search");

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

  if (!searchResults) {
    return (
      <main className="container flex flex-col items-center font-poppins">
        <TbFolderQuestion size={40} className="mt-60" />
        <h2 className="my-8 font-semibold leading-8">No results found.</h2>
      </main>
    );
  }

  return (
    <main className="flex h-full flex-wrap justify-center gap-8 overflow-y-auto p-8">
      {searchResults.videos.map((n) => (
        <VideoCard video={n} key={n.videoId} />
      ))}
    </main>
  );
}
