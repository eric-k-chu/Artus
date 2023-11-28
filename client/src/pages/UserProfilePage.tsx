import { IoPerson } from "react-icons/io5";
import { ErrorNotice, VideoCard, VideoCardLoading } from "../components";
import { useUserProfile } from "../lib";

export function UserProfilePage() {
  const { username, videos, isLoading, error } = useUserProfile();

  if (isLoading) {
    return (
      <main className="mt-4 flex w-full w-full max-w-[1080px] flex-col items-center gap-y-2 p-4">
        <section className="flex w-full basis-1/6 items-center gap-x-4 rounded-md border border-l-brdr bg-l-bg-1 p-4 shadow-sm shadow-l-shdw dark:border-none dark:bg-d-bg-03dp dark:shadow-none">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-silver">
            <IoPerson className="h-16 w-16 text-silver" />
          </div>
          <h2 className="animate-pulse font-poppins text-lg font-semibold text-gray">
            username
          </h2>
        </section>
        <section className="mt-2 flex w-full flex-wrap justify-center gap-7">
          <VideoCardLoading />
        </section>
      </main>
    );
  }

  if (error) {
    return <ErrorNotice error={error} />;
  }

  return (
    <main className="mt-4 flex w-full w-full max-w-[1080px] flex-col items-center gap-y-2 p-4">
      <section className="flex w-full basis-1/6 items-center gap-x-4 rounded-md border border-l-brdr bg-l-bg-1 p-4 shadow-sm shadow-l-shdw dark:border-none dark:bg-d-bg-03dp dark:shadow-none">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-silver">
          <IoPerson className="h-16 w-16 text-silver" />
        </div>
        <h2 className="font-poppins text-lg font-semibold">{username}</h2>
      </section>
      <section className="mt-2 flex w-full flex-wrap justify-center gap-7">
        {videos.map((n) => (
          <VideoCard video={n} key={n.videoId} />
        ))}
      </section>
    </main>
  );
}
