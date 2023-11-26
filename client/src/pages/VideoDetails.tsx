import { useTitle, useVideo } from "../lib";
import { useParams } from "react-router-dom";
import { VideoInfo, VideoPlayer } from "../components";

export function VideoDetails() {
  const { videoId } = useParams();
  const { video, isLoading, error } = useVideo(Number(videoId));
  useTitle(String(videoId));

  if (isLoading) {
    return (
      <div className="container flex h-full flex-col items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    <div className="container flex h-full flex-col items-center justify-center">
      {error instanceof Error ? error.message : "Unknown error."}
    </div>;
  }

  return (
    <div className="flex h-full w-full flex-wrap items-center justify-center gap-x-4 p-8 lg:flex-nowrap">
      <VideoPlayer videoUrl={video?.videoUrl} />
      <VideoInfo video={video} />
    </div>
  );
}
