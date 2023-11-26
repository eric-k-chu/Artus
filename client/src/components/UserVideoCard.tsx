import { Link } from "react-router-dom";
import { type Video } from "../lib";
import { IoChevronForward } from "react-icons/io5";

type Props = {
  video: Video;
};

export function UserVideoCard({ video }: Props) {
  return (
    <Link
      to={`/dashboard/manage-videos/${video.videoId}`}
      className="flex h-36 w-full items-center gap-x-2 rounded-md border border-light-border bg-light-background-3 p-4 shadow-sm shadow-light-shadow hover:cursor-pointer dark:border-none dark:bg-dark-background-12dp dark:shadow-none"
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
                className="rounded-md bg-light-primary p-1 text-xs font-semibold dark:bg-dark-primary"
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

/*

      {isOpen && (
          <>
            <div className="flex w-full items-center rounded-md p-1 text-xs ring-1 ring-silver focus-within:ring-2 focus-within:ring-blue-500 dark:border-gray dark:bg-black/30 md:text-sm">
              <span className="select-none px-2 font-poppins text-slate-500">
                caption
              </span>
              <input
                value={caption}
                onChange={(e) => setCaption(e.currentTarget.value)}
                className="w-full flex-1 bg-transparent font-raleway focus:outline-none"
              />
            </div>
            <div className="flex w-full items-center rounded-md p-1 text-xs ring-1 ring-silver focus-within:ring-2 focus-within:ring-blue-500 dark:border-gray dark:bg-black/30 md:text-sm">
              <span className="select-none px-2 font-poppins text-slate-500">
                tags
              </span>
              <input
                value={tags}
                onChange={(e) => setTags(e.currentTarget.value)}
                className="w-full flex-1 bg-transparent font-raleway focus:outline-none"
              />
            </div>
            <button
              className="self-end rounded-md bg-aquamarine p-1 font-poppins text-sm hover:bg-aquamarine/75"
              type="submit"
            >
              Save
            </button>
          </>
        )}


*/
