import { FormEvent, useState } from "react";
import { IoPencil } from "react-icons/io5";
import { updateVideo, type User, type Video } from "../lib";

type Props = {
  video: Partial<Video & User>;
  onEdit: (video: Video) => void;
};

export function UserVideoCard({ video, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [caption, setCaption] = useState(video.caption);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      const res = await updateVideo(video.videoId, caption);
      setCaption(res.video.caption);
      onEdit(res.video);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEditing(false);
    }
  }

  return (
    <form
      className="flex h-40 w-1/2 items-center gap-x-2 rounded-md bg-white p-4 shadow-md dark:bg-void"
      onSubmit={handleSubmit}
    >
      <img
        src={video.thumbnailUrl}
        className="h-32 w-32 min-w-[8rem] rounded-md object-cover"
      />
      <div className="flex w-full flex-col">
        <label className="font-poppins">
          <h3 className="font-semibold">Caption</h3>
          {isEditing ? (
            <input
              value={caption}
              onChange={(e) => setCaption(e.currentTarget.value)}
              className="w-full rounded-md border border-silver bg-gray/40 p-1 font-raleway dark:border-gray dark:bg-black/30"
            />
          ) : (
            <p className="w-full py-1 font-raleway font-thin italic">
              {video.caption}
            </p>
          )}
        </label>
      </div>
      {isEditing ? (
        <div className="mt-4 flex items-center justify-center gap-y-2">
          <button
            className="rounded-l-md bg-mint-green p-2 text-black shadow-md hover:scale-105 hover:cursor-pointer"
            type="submit"
          >
            Save
          </button>
          <button
            className="rounded-r-md bg-tea-rose p-2 text-black shadow-md hover:scale-105 hover:cursor-pointer"
            onClick={() => setIsEditing(false)}
          >
            Quit
          </button>
        </div>
      ) : (
        <IoPencil
          className="h-6 w-6 hover:scale-110 hover:cursor-pointer hover:text-aquamarine"
          onClick={() => setIsEditing(true)}
        />
      )}
    </form>
  );
}
