import { type Video } from "../lib";
import { Link } from "react-router-dom";

type Props = {
  video: Video;
};

export function VideoCard({ video }: Props) {
  return (
    <Link
      className="relative h-[384px] w-[240px] rounded-md bg-black"
      to={String(video.videoId)}
    >
      <img
        className="h-full w-full rounded-md object-cover"
        src={video.thumbnailUrl}
      />
      <div className="absolute bottom-0 flex h-8 w-full items-center p-2">
        <h4 className="truncate text-white">{video.caption}</h4>
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
