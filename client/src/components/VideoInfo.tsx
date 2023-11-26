import { IoPerson } from "react-icons/io5";
import { type Video, getDate } from "../lib";

type Props = {
  video: Video | undefined;
};

export function VideoInfo({ video }: Props) {
  return (
    <main className="mt-2 flex w-full flex-col gap-y-2">
      <section className="flex items-center">
        <h2 className="font-poppins text-sm font-semibold lg:text-lg">
          {video?.caption}
        </h2>
        <h4 className="ml-auto font-poppins text-sm font-thin lg:text-base">
          {getDate(video?.uploadedAt)}
        </h4>
      </section>
      <section className="flex w-fit items-center gap-x-2 rounded-md border border-light-border bg-light-background-1 p-2 shadow-sm shadow-light-shadow dark:border-none dark:bg-dark-background-03dp dark:shadow-none">
        <IoPerson size={16} />
        <span className="font-poppins text-xs lg:text-sm">
          {video?.username}
        </span>
      </section>
      <section className="mt-2 flex flex-wrap items-center gap-4 font-poppins">
        {video?.tags[0] !== null &&
          video?.tags.map((n, i) => (
            <div
              key={i}
              className="rounded-md bg-light-primary p-2 text-xs text-white/90 shadow-md dark:bg-dark-primary lg:text-sm"
            >
              {n}
            </div>
          ))}
      </section>
    </main>
  );
}
