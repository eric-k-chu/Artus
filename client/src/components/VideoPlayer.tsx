type Props = {
  videoUrl: string | undefined;
};

export function VideoPlayer({ videoUrl }: Props) {
  return (
    <video
      controls
      loop
      muted
      autoPlay
      className="aspect-video w-full rounded-md bg-black/90"
    >
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
}
