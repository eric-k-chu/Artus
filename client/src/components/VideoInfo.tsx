import { IoPerson } from "react-icons/io5";
import { type VideoDetails, getDate } from "../lib";

type Props = {
  videoDetails: VideoDetails | undefined;
};

export function VideoInfo({ videoDetails }: Props) {
  return (
    <div className="flex basis-full flex-col gap-y-4 py-4 font-raleway lg:basis-4/12 2xl:basis-2/12">
      <h2 className="font-poppins text-sm font-semibold lg:text-lg">
        {videoDetails?.video.caption}
      </h2>
      <h4 className="text-xs lg:text-sm">
        {getDate(videoDetails?.video.uploadedAt)}
      </h4>
      <div className="flex w-fit items-center gap-x-2 rounded-md border border-aquamarine bg-white p-2 shadow-md dark:bg-void">
        <IoPerson size={16} />
        <span className="text-xs lg:text-sm">
          {videoDetails?.video.username}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {videoDetails?.tags.map((n, i) => (
          <div
            key={i}
            className="rounded-md bg-tea-rose p-2 text-sm text-black shadow-md lg:text-lg"
          >
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}
