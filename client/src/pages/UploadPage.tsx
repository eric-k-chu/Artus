import { FormEvent, useContext } from "react";
import { AppContext } from "../components/AppContext";
import { uploadVideos } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../lib/custom-hooks";

export function UploadPage() {
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext);

  useTitle("Upload");

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    try {
      console.log("Uploading now...");
      const videos = await uploadVideos(form, user?.userId, token);
      console.log(videos);
    } catch (err) {
      console.error(Error);
    } finally {
      navigate("/dashboard");
    }
  }

  return (
    <form
      className="container flex h-full w-full flex-col items-center justify-center"
      onSubmit={handleSubmit}
    >
      <div className="flex h-4/5 w-4/5 flex-col items-center justify-center gap-y-8 rounded-md border-2 border-dotted border-silver dark:border-gray">
        <label htmlFor="file-input" className="font-poppins">
          Choose files to upload.
        </label>
        <input
          className="rounded-md border-2 border-silver font-raleway dark:border-gray"
          required
          id="file-input"
          type="file"
          name="videos"
          accept=".webm, .mp4, .mov, .avi, .gif"
          multiple={true}
        />
        <button
          className="rounded-md bg-aquamarine p-2 text-black hover:cursor-pointer hover:bg-aquamarine/75"
          type="submit"
        >
          Upload
        </button>
      </div>
    </form>
  );
}
