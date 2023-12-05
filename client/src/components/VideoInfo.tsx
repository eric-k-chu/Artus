import { IoPerson, IoHeartOutline, IoHeart } from "react-icons/io5";
import { type Video, getDate, useHasLiked, toggleLike } from "../lib";
import { useState } from "react";
import { ErrorNotice, LoadingCircle } from ".";
import { useApp } from "../lib";

type Props = {
  video: Video | undefined;
  videoId: number;
};

export function VideoInfo({ video, videoId }: Props) {
  const [likes, setLikes] = useState(video?.likes ?? 0);
  const [isPending, setIsPending] = useState(false);
  const [likeError, setLikeError] = useState<unknown>();
  const { hasLiked, isLoading, error, setHasLiked } = useHasLiked(videoId);
  const { user } = useApp();

  async function handleLike(): Promise<void> {
    if (!user || likes === undefined || isPending || hasLiked === undefined)
      return;
    setIsPending(true);
    try {
      await toggleLike(videoId, hasLiked);
      setLikes(hasLiked ? likes - 1 : likes + 1);
    } catch (err) {
      setLikeError(err);
    } finally {
      setIsPending(false);
      setHasLiked(!hasLiked);
    }
  }

  if (isLoading) {
    return (
      <div className="container mt-40 flex justify-center">
        <LoadingCircle />
      </div>
    );
  }

  if (likeError) {
    return (
      <div className="-mt-52">
        <ErrorNotice error={likeError} />
      </div>
    );
  }

  // onMount loading error
  if (error) {
    <div className="-mt-52">
      <ErrorNotice error={error} />
    </div>;
  }

  return (
    <main className="mt-2 flex w-full flex-col gap-y-4">
      <section className="flex items-center">
        <h2 className="font-poppins text-sm font-semibold lg:text-lg">
          {video?.caption}
        </h2>
        <button
          type="button"
          className="relative ml-auto flex items-center gap-x-2 rounded-md border border-l-brdr bg-l-bg-1 px-2 py-1 shadow-sm shadow-l-shdw dark:border-none dark:bg-d-bg-03dp dark:shadow-none"
          onClick={handleLike}
        >
          {isPending && (
            <div className="absolute flex h-full w-full items-center backdrop-blur-sm">
              <LoadingCircle size="sm" />
            </div>
          )}
          {hasLiked ? (
            <IoHeart className="text-l-err dark:text-d-err" />
          ) : (
            <IoHeartOutline />
          )}
          <span className="font-poppins">{likes}</span>
        </button>
      </section>
      <section className="flex items-center gap-x-2">
        <section className="flex w-fit items-center gap-x-2 rounded-md border border-l-brdr bg-l-bg-1 p-2 shadow-sm shadow-l-shdw dark:border-none dark:bg-d-bg-03dp dark:shadow-none">
          <IoPerson size={16} />
          <span className="font-poppins text-xs lg:text-sm">
            {video?.username}
          </span>
        </section>
        <h4 className="font-poppins text-xs font-thin text-gray dark:text-white/60 lg:text-sm">
          {"Uploaded on " + getDate(video?.uploadedAt)}
        </h4>
      </section>
      <section className="flex flex-wrap items-center gap-4 font-poppins">
        {video?.tags &&
          video.tags.map((n, i) => (
            <div
              key={i}
              className="rounded-md bg-l-p p-2 text-xs text-white/90 shadow-md dark:bg-d-p lg:text-sm"
            >
              {n}
            </div>
          ))}
      </section>
    </main>
  );
}
