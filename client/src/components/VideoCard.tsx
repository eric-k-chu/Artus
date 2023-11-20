import { type Video } from "../lib";
import { Link } from "react-router-dom";

type Props = {
  video: Video;
};

export function VideoCard({ video }: Props) {
  return (
    <Link
      className="relative flex h-96 w-60 flex-col bg-mint-green"
      to={String(video.videoId)}
    >
      <img className="h-full w-full" src={video.thumbnailUrl} />
      <div className="absolute bottom-0 flex h-8 w-full items-center p-2">
        <p className="truncate">{video.caption}</p>
      </div>
    </Link>
  );
}
