import { VideoInfo, VideoPlayer } from "../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTitle, fetchVideoDetails, type Video } from "../lib";

export function VideoDetails() {
  const { videoId } = useParams();
  const [video, setVideo] = useState<Video>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useTitle(String(videoId));

  useEffect(() => {
    async function loadVideo(videoId: number) {
      try {
        setVideo(await fetchVideoDetails(videoId));
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (videoId) {
      setIsLoading(true);
      loadVideo(+videoId);
    }
  }, [videoId]);

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
