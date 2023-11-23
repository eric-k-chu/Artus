import { FormEvent, useState } from "react";
import { updateVideo, type Video } from "../lib";
import { IoChevronForward } from "react-icons/io5";

type Props = {
  video: Video;
  isOpen: boolean;
  onSelect: () => void;
};

export function UserVideoCard({ video, isOpen, onSelect }: Props) {
  const [caption, setCaption] = useState(video.caption);
  const [tags, setTags] = useState(video.tags.join(","));

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      await updateVideo(video.videoId, caption as string, tags.split(","));
    } catch (err) {
      console.error(err);
    } finally {
      onSelect();
    }
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={`flex h-36 w-full items-center gap-x-2 bg-white p-4 shadow-md shadow-black shadow-black dark:bg-void lg:max-w-[60rem] ${
          isOpen ? "rounded-t-md" : "rounded-md"
        }`}
      >
        <img
          src={video.thumbnailUrl}
          className="h-28 w-28 min-w-[8rem] rounded-md object-cover"
        />
        <div className="hidden flex-col gap-y-2 min-[360px]:flex">
          <p className="w-full py-1 font-raleway text-sm font-thin italic">
            {caption}
          </p>
          <div className="hidden flex-wrap items-center gap-2 font-raleway text-black empty:hidden min-[500px]:flex">
            {tags &&
              tags.split(",").map((n, i) => (
                <div key={i} className="rounded-md bg-tea-rose p-1 text-xs">
                  {n}
                </div>
              ))}
          </div>
        </div>
        <IoChevronForward
          className={`ml-auto h-6 min-h-[1.5rem] w-6 min-w-[1.5rem] transition-transform hover:scale-110 hover:cursor-pointer hover:text-aquamarine ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
          onClick={onSelect}
        />
      </div>
      <form
        className="flex w-full flex-col gap-y-4 rounded-b-md bg-white p-4 shadow-md shadow-black empty:hidden dark:bg-void lg:max-w-[60rem]"
        onSubmit={handleSubmit}
      >
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
      </form>
    </div>
  );
}
