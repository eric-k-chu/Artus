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
      className="container mt-8 flex h-[192px] w-[320px] items-center justify-center font-poppins md:h-[288px] md:w-[480px] lg:h-[576px] lg:w-[960px]"
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
          className={`mt-4 rounded-md bg-l-p p-2 font-poppins text-white shadow-md dark:bg-d-p ${
            hasChanged ? "visible" : "invisible"
          }`}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
