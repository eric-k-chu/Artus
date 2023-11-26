import { type Video } from "../lib";
import { Link } from "react-router-dom";

type Props = {
  video: Video;
};

export function VideoCard({ video }: Props) {
  return (
    <Link
      className="relative max-h-[24rem] min-h-[24rem] min-w-[15rem] max-w-[15rem] rounded-md bg-black"
      to={String(video.videoId)}
    >
      <img
        className="h-full w-full rounded-md object-cover"
        src={video.thumbnailUrl}
      />
      <div className="absolute bottom-0 flex h-8 w-full items-center p-2">
        <p className="truncate text-white">{video.caption}</p>
      </div>
    </Link>
  );
}

export function VideoCardLoading() {
  const temp = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      {temp.map((n) => (
        <article
          key={n}
          className="relative h-96 w-60 animate-pulse rounded-md bg-silver dark:bg-dark-background-03dp"
        />
      ))}
    </>
  );
}
