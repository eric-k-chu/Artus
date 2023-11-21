import { type Video } from "../lib";
import { Link } from "react-router-dom";

type Props = {
  video: Video;
};

export function VideoCard({ video }: Props) {
  return (
    <Link
      className="relative h-96 w-60 rounded-md bg-black"
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
