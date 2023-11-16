import { FormEvent, useContext, useState } from "react";
import { AppContext } from "../components/AppContext";
import { uploadVideos } from "../lib/api";

export function UploadPage() {
  const { user, token } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState<boolean>();

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const videos = await uploadVideos(form, user?.userId, token);
      console.log(videos);
    } catch (err) {
      console.error(Error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="container flex h-full flex-col items-center justify-center gap-y-8"
      onSubmit={handleSubmit}
    >
      <h1>{isLoading ? "Loading..." : "Uploaded!"}</h1>
      <input
        required
        type="file"
        name="videos"
        accept=".webm, .mp4, .mov, .avi, .gif"
        multiple={true}
      />
      <button className="bg-void p-2 hover:cursor-pointer" type="submit">
        Upload
      </button>
    </form>
  );
}
