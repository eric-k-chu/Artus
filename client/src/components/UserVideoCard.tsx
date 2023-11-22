import { IoPencil, IoChevronForward } from "react-icons/io5";
import { FormEvent, useState } from "react";
import { getVideoTags, Tag, updateVideo, type User, type Video } from "../lib";

type Props = {
  video: Partial<Video & User>;
  isOpen: boolean;
  onSelect: () => void;
};

export function UserVideoCard({ video, isOpen, onSelect }: Props) {
  const [caption, setCaption] = useState(video.caption);
  const [tags, setTags] = useState<Tag[]>();
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  console.log(tags);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      const res = await updateVideo(video.videoId, caption);
      setCaption(res.video.caption);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleEditClick(): Promise<void> {
    onSelect();
    if (isOpen) return;

    try {
      const tags = await getVideoTags(video.videoId);
      setTags(tags);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex w-full flex-col items-center">
      <form
        className={`flex h-36 w-1/2 items-center gap-x-2 bg-white p-4 shadow-md dark:bg-void ${
          isOpen ? "rounded-t-md" : "rounded-md"
        }`}
        onSubmit={handleSubmit}
      >
        <img
          src={video.thumbnailUrl}
          className="h-28 w-28 min-w-[8rem] rounded-md object-cover"
        />
        <div className="flex flex-col gap-y-2">
          <p className="w-full py-1 font-raleway font-thin italic">
            {video.caption}
          </p>
        </div>
        <IoChevronForward
          className={`ml-auto h-6 w-6 transition-transform hover:scale-110 hover:cursor-pointer hover:text-aquamarine ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
          onClick={handleEditClick}
        />
      </form>
      <div className="flex w-1/2 flex-col rounded-b-md bg-white p-4 shadow-md empty:hidden dark:bg-void">
        {isOpen && (
          <div className="flex items-center gap-x-2">
            <input
              value={caption}
              onChange={(e) => setCaption(e.currentTarget.value)}
              className="rounded-md border border-silver bg-gray/40 p-1 font-raleway dark:border-gray dark:bg-black/30"
            />
            {isEditingCaption ? (
              <div className="flex items-center justify-center gap-y-2 text-sm">
                <button
                  className="rounded-l-md bg-mint-green p-1 text-black shadow-md hover:scale-105 hover:cursor-pointer"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="rounded-r-md bg-tea-rose p-1 text-black shadow-md hover:scale-105 hover:cursor-pointer"
                  onClick={() => setIsEditingCaption(false)}
                >
                  Quit
                </button>
              </div>
            ) : (
              <IoPencil
                className="h-6 w-6 hover:scale-110 hover:cursor-pointer hover:text-aquamarine"
                onClick={() => setIsEditingCaption(true)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
