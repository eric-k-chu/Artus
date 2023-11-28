import { Link } from "react-router-dom";
import { type Video } from "../lib";
import { IoChevronForward } from "react-icons/io5";

type Props = {
  video: Video;
  url: string;
};

export function UserVideoCard({ video, url }: Props) {
  return (
    <Link
      to={url}
      className="flex h-36 w-full items-center gap-x-2 rounded-md border border-l-brdr bg-l-bg-3 p-4 shadow-sm shadow-l-shdw hover:cursor-pointer dark:border-none dark:bg-d-bg-12dp dark:shadow-none"
    >
      <img
        src={video.thumbnailUrl}
        className="max-h-[8rem] min-h-[8rem] min-w-[8rem] max-w-[8rem] rounded-md object-cover"
      />
      <section className="hidden flex-col gap-y-2 min-[360px]:flex">
        <h4 className="w-full py-1 font-raleway text-sm font-thin italic">
          {video.caption}
        </h4>
        <div className="hidden flex-wrap items-center gap-2 font-raleway text-white/90 empty:hidden min-[500px]:flex">
          {video.tags &&
            video.tags.map((n, i) => (
              <div
                key={i}
                className="rounded-md bg-l-p p-1 text-xs font-semibold dark:bg-d-p"
              >
                {n}
              </div>
            ))}
        </div>
      </section>
      <IoChevronForward className="ml-auto h-6 min-h-[1.5rem] w-6 min-w-[1.5rem]" />
    </Link>
  );
}
