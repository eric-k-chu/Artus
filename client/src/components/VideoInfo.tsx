import { IoPerson, IoHeartOutline, IoHeart } from "react-icons/io5";
import {
  type Video,
  getDate,
  incrementLikes,
  useHasLiked,
  decrementLikes,
} from "../lib";
import { useContext, useState } from "react";
import { AppContext, ErrorNotice, LoadingCircle } from ".";

type Props = {
  video: Video | undefined;
};

export function VideoInfo({ video }: Props) {
  const [likes, setLikes] = useState(video?.likes);
  const [isPending, setIsPending] = useState(false);
  const [err, setErr] = useState<unknown>();
  const { user } = useContext(AppContext);
  const { hasLiked, isLoading, error } = useHasLiked(video?.videoId);

  async function handleLike(): Promise<void> {
    if (!user || likes === undefined) return;
    setIsPending(true);
    try {
      if (!hasLiked) {
        await incrementLikes(video?.videoId);
        setLikes(likes + 1);
      } else {
        await decrementLikes(video?.videoId);
        setLikes(likes - 1);
      }
    } catch (err) {
      setErr(err);
    } finally {
      setIsPending(false);
    }
  }

  if (isLoading) {
    return (
      <div className="container mt-40 flex justify-center">
        <LoadingCircle />
      </div>
    );
  }

  if (err || error) {
    return <ErrorNotice error={err} />;
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
