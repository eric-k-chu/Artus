import { FormEvent, useRef } from "react";
import { IoImage } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useTitle, uploadPromise, useApp } from "../lib"; //use App

export function UploadPage() {
  const { handleSetFiles } = useApp();
  const navigate = useNavigate();
  const input = useRef<HTMLInputElement>(null);
  useTitle("Upload");

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    // handleSetForm(new FormData(e.currentTarget));
    // navigate("/dashboard/pending");

    const form = new FormData(e.currentTarget);
    uploadPromise(form)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // set file objects to app context data.
        console.log(data);
        handleSetFiles(data);
      })
      .then(() => {
        navigate("/dashboard/pending");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("uploaded");
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
        <p className="text-xs leading-5 text-gray">
          WEBM, MP4, MOV up to 100MB
        </p>
      </div>
    </form>
  );
}
