import { FormEvent, useState } from "react";
import { IoImage } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { uploadVideos, useTitle } from "../lib";

export function UploadPage() {
  const [hasChanged, setHasChanged] = useState(false);
  const navigate = useNavigate();
  useTitle("Upload");

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    try {
      console.log("Uploading now...");
      navigate("/dashboard");
      await uploadVideos(form);
    } catch (err) {
      console.error(Error);
    } finally {
      setHasChanged(false);
    }
  }

  return (
    <form
      className="container flex h-full w-full items-center justify-center font-poppins"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <div className="flex h-4/5 w-4/5 flex-col items-center justify-center rounded-md border-2 border-dashed border-silver dark:border-gray">
        <IoImage className="text-gray/50" size={48} />
        <div className="mb-2 mt-4 flex">
          <label
            htmlFor="file-input"
            className="cursor-pointer rounded-md text-tea-rose focus-within:ring-offset-2 hover:text-tea-rose/75"
          >
            <span>Upload a file</span>
            <input
              className="sr-only"
              required
              id="file-input"
              type="file"
              name="videos"
              accept=".webm, .mp4, .mov"
              multiple={true}
              onChange={() => setHasChanged(true)}
            />
          </label>
          <p className="pl-1 text-gray">or drag and drop</p>
        </div>
        <p className="text-xs leading-5 text-gray">
          WEBM, MP4, MOV up to 100MB
        </p>

        <button
          className={`mt-4 rounded-md bg-aquamarine p-2 font-poppins shadow-md hover:bg-aquamarine/80 ${
            hasChanged ? "visible" : "invisible"
          }`}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
