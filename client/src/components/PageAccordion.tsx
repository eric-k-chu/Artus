import { useState } from "react";
import { UserVideoCard } from ".";
import { type Video } from "../lib";

type Props = {
  videos: Video[];
};

export function PageAccordion({ videos }: Props) {
  const [currentVideo, setCurrentVideo] = useState<Video>();

  function handleSelection(video: Video | undefined) {
    if (currentVideo === video) {
      setCurrentVideo(undefined);
    } else {
      setCurrentVideo(video);
    }
  }

  return (
    <>
      {videos.map((n) => (
        <UserVideoCard
          key={n.videoId}
          video={n}
          isOpen={currentVideo === n}
          onSelect={() => handleSelection(n)}
        />
      ))}
    </>
  );
}
