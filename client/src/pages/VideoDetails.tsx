import { useTitle, useVideo } from "../lib";
import { useParams } from "react-router-dom";
import {
  ErrorNotice,
  LoadingCircle,
  VideoInfo,
  VideoPlayer,
} from "../components";

export function VideoDetails() {
  const { videoId } = useParams();
  const { video, isLoading, error } = useVideo(Number(videoId));
  useTitle(String(videoId));

  if (isLoading) {
    return (
      <div className="mt-20 flex justify-center">
        <LoadingCircle />
      </div>
    );
  }

  if (error) {
    return <ErrorNotice error={error} />;
  }

  return (
    <div className="mt-10 flex h-[180px] w-[320px] flex-col items-center sm:h-[270px] sm:w-[480px] md:h-[405px] md:w-[720px] lg:h-[495px] lg:w-[880px]">
      <VideoPlayer videoUrl={video?.videoUrl} />
      <VideoInfo video={video} videoId={Number(videoId)} />
    </div>
  );
}
