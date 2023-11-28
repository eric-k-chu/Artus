import { createContext } from "react";
import { type Video } from "../lib";

type VideosContextValues = {
  videos: Video[][] | undefined;
  setVideos: (videos: Video[][]) => void;
};

export const VideosContext = createContext<VideosContextValues>({
  videos: undefined,
  setVideos: () => undefined,
});
