import { type User, type Video } from "../lib";

type Props = {
  video: Partial<Video & User>;
};

export function UserVideoCard({ video }: Props) {
  return (
    <form className="flex h-40 w-3/5 items-center gap-x-2 rounded-md bg-white p-4 shadow-md dark:bg-void">
      <img src={video.thumbnailUrl} className="h-32 w-32 object-cover" />
      <div className="flex w-full flex-col gap-y-2">
        <label className="font-poppins">
          <h3>Caption</h3>
          <input className="w-full rounded-md border border-silver bg-gray/40 p-1 font-raleway dark:border-gray dark:bg-black/30" />
        </label>
        <label className="font-poppins">
          <h3>Tags</h3>
          <input className="w-full rounded-md border border-silver bg-gray/40 p-1 font-raleway dark:border-gray dark:bg-black/30" />
        </label>
      </div>
      <button className="mt-4 rounded-md bg-mint-green p-2 shadow-md hover:cursor-pointer">
        Save
      </button>
    </form>
  );
}
