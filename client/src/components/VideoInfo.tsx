import { IoPerson } from "react-icons/io5";
import { type VideoDetails, getDate } from "../lib";

type Props = {
  videoDetails: VideoDetails | undefined;
};

export function VideoInfo({ videoDetails }: Props) {
  return (
    <div className="flex basis-full flex-col gap-y-4 py-4 font-raleway lg:basis-1/2 lg:px-4">
      <h2 className="font-poppins text-lg font-semibold">
        {videoDetails?.caption}
      </h2>
      <h4 className="text-sm">{getDate(videoDetails?.uploadedAt)}</h4>
      <div className="flex w-fit items-center gap-x-2 rounded-md bg-white p-2 shadow-md dark:bg-void">
        <IoPerson size={16} />
        <span>{videoDetails?.username}</span>
      </div>
    </div>
  );
}
