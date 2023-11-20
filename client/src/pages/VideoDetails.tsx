import { VideoInfo, VideoPlayer } from "../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTitle, fetchVideoDetails, type VideoDetails } from "../lib";

export function VideoDetails() {
  const { videoId } = useParams();
  const [videoDetails, setVideoDetails] = useState<VideoDetails>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useTitle(String(videoId));

  useEffect(() => {
    async function loadVideo(videoId: number) {
      try {
        const videoDetails = await fetchVideoDetails(videoId);
        setVideoDetails(videoDetails);
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
    <div className="container flex flex-wrap items-center justify-center p-8 lg:flex-nowrap lg:justify-start">
      <VideoPlayer />
      <VideoInfo videoDetails={videoDetails} />
    </div>
  );
}
