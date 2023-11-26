import { useNavigate, useParams, Link } from "react-router-dom";
import { deleteVideo, updateVideo, useVideo } from "../lib";
import { ErrorNotice, LoadingCircle } from "../components";
import { FormEvent, useState } from "react";

export function UserVideoPage() {
  const navigate = useNavigate();
  const { videoId } = useParams();
  const video = useVideo(Number(videoId));
  const [isPending, setIsPending] = useState<boolean>(false);
  const [err, setErr] = useState<unknown>();

  async function handleDelete(): Promise<void> {
    setIsPending(true);
    try {
      await deleteVideo(Number(videoId));
    } catch (err) {
      setErr(err);
    } finally {
      setIsPending(false);
      navigate("/dashboard/manage-videos");
    }
  }

  async function handleUpdate(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setIsPending(true);
    try {
      await updateVideo(Number(videoId), video.caption, video.tags);
    } catch (err) {
      setErr(err);
    } finally {
      setIsPending(false);
      navigate("/dashboard/manage-videos");
    }
  }

  if (video.isLoading) {
    return (
      <div className="container mt-20 flex justify-center">
        <LoadingCircle />
      </div>
    );
  }

  if (video.error) {
    return <ErrorNotice error={video.error} />;
  }

  return (
    <main className="mt-16 flex w-full max-w-[1080px] gap-x-2 p-4">
      <form
        className="relative flex w-full flex-col gap-y-4 rounded-md border border-light-border bg-light-background-1 p-4 shadow-sm shadow-light-shadow dark:border-none dark:bg-dark-background-03dp dark:shadow-none"
        onSubmit={handleUpdate}
      >
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/20 backdrop-blur-sm">
            {err instanceof Error ? (
              <span className="font-poppins font-semibold text-light-error dark:text-dark-error">
                {err.message}
              </span>
            ) : (
              <LoadingCircle />
            )}
          </div>
        )}
        <Link to="/dashboard/manage-videos" className="mb-2">
          {"<"} Back
        </Link>
        <label className="space-y-2">
          <div className="flex items-center">
            <h3 className="font-poppins font-semibold">Caption</h3>
            <span className="ml-auto font-raleway text-xs text-gray">
              videos must have a caption
            </span>
          </div>
          <input
            value={video.caption}
            onChange={(e) => video.setCaption(e.currentTarget.value)}
            required
            className="w-full rounded-sm bg-transparent px-2 font-raleway outline-none ring-1 ring-silver focus:ring-light-secondary dark:ring-gray"
          />
        </label>
        <label className="space-y-2">
          <div className="flex items-center">
            <h3 className="font-poppins font-semibold">Tags</h3>
            <span className="ml-auto font-raleway text-xs text-gray">
              tags are separated by commas
            </span>
          </div>
          <input
            value={video.tags}
            onChange={(e) => video.setTags(e.currentTarget.value)}
            className="w-full rounded-sm bg-transparent px-2 font-raleway outline-none ring-1 ring-silver focus:ring-light-secondary dark:ring-gray"
          />
        </label>
        <div className="mt-4 flex items-center justify-between">
          <button
            className="rounded-md bg-light-error px-2 py-1 font-poppins text-sm text-white/90 shadow-md shadow-md dark:bg-dark-error"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="rounded-md bg-light-secondary px-2 py-1 font-poppins text-sm text-black shadow-md shadow-md dark:bg-dark-secondary"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
      <section className="hidden max-h-[12rem] min-h-[12rem] min-w-[12rem] max-w-[12rem] rounded-md border border-light-border bg-light-background-1 p-2 shadow-sm shadow-light-shadow dark:border-none dark:bg-dark-background-03dp dark:shadow-none md:block">
        <img
          src={video.video?.thumbnailUrl}
          className="h-full w-full rounded-md object-cover"
        />
      </section>
    </main>
  );
}
