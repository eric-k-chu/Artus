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
      className="aspect-video max-w-screen-lg basis-full bg-black lg:basis-6/12 xl:basis-8/12 2xl:basis-9/12"
    >
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
}
