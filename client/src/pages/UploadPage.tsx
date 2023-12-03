import { FormEvent, useRef, useState } from "react";
import { IoCheckmark, IoImage } from "react-icons/io5";
import { useTitle, PendingFile, uploadVideos, fetchUploadStatus } from "../lib";
import { ErrorNotice, LoadingCircle } from "../components";
import { useNavigate } from "react-router-dom";

export function UploadPage() {
  const [files, setFiles] = useState<PendingFile[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const input = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  useTitle("Upload");

  async function checkFileStatus(files: PendingFile[]) {
    const intervalId = setInterval(async () => {
      try {
        if (!files) return;
        const statuses = await fetchUploadStatus(files);
        setFiles(statuses);
        const isFinished = statuses.every((file) => file.status === "Finished");
        if (isFinished) {
          clearInterval(intervalId);
          navigate("/dashboard/manage-videos");
        }
      } catch (err) {
        setError(err);
      }
    }, 3000);
  }

  // Multer hangs more with async await vs then catch
  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setIsLoading(true);
    uploadVideos(form)
      .then((res) => res.json())
      .then((files) => {
        console.log(files);
        setFiles(files);
        checkFileStatus(files);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }

  if (isLoading) {
    return (
      <main className="mt-60 flex justify-center">
        <LoadingCircle />
      </main>
    );
  }

  if (error) {
    return <ErrorNotice error={error} />;
  }

  if (files) {
    return (
      <ul className="mt-10 flex w-1/2 flex-col gap-y-2 p-4">
        {files.map((n, i) => (
          <li
            key={i}
            className="flex w-full items-center rounded-md bg-l-bg-4 p-4 dark:bg-d-bg-12dp"
          >
            <p className="font-gray truncate font-poppins">{n.filename}</p>
            <div className="ml-auto">
              {n.status === "Pending" ? (
                <LoadingCircle size="sm" />
              ) : (
                <IoCheckmark className="text-green-400" />
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <form
      className="container mt-16 flex h-[192px] w-[320px] items-center justify-center font-poppins md:h-[288px] md:w-[480px] lg:h-[576px] lg:w-[960px]"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <div className="flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-silver dark:border-gray">
        <IoImage className="text-gray/50" size={48} />
        <div className="mb-2 mt-4 flex">
          <label
            htmlFor="file-input"
            className="cursor-pointer rounded-md text-l-s focus-within:ring-offset-2 dark:text-d-s"
          >
            <span>Upload a file</span>
            <input
              ref={input}
              className="sr-only"
              required
              id="file-input"
              type="file"
              name="videos"
              accept=".webm, .mp4, .mov"
              multiple={true}
              onChange={() => input.current?.form?.requestSubmit()}
            />
          </label>
          <p className="pl-1 text-gray">or files</p>
        </div>
        <p className="text-xs leading-5 text-gray">WEBM, MP4, MOV up to 5 mb</p>
      </div>
    </form>
  );
}
