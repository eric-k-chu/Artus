import { useUploadVideos } from "../lib";
import { PendingVideoCard } from "../components/PendingVideoCard";

export function PendingPage() {
  const { files, isPending, error } = useUploadVideos();

  // useEffect(() => {
  //   if (form) {
  //     const ex = Array.from(form);
  //     console.log("form", form.getAll("videos"));
  //     console.log("array", ex);
  //   }
  // }, [form]);

  if (error) {
    return (
      <main className="flex w-full flex-col items-center gap-y-4 rounded-md border border-l-brdr bg-l-bg-1 p-4 shadow-sm shadow-l-shdw dark:border-none dark:bg-d-bg-03dp dark:shadow-none">
        <span className="font-poppins text-red-600">
          {error instanceof Error ? error.message : "Unknown error."}
        </span>
      </main>
    );
  }

  return (
    <main className="flex w-full flex-col items-center gap-y-4 rounded-md border border-l-brdr bg-l-bg-1 p-4 shadow-sm shadow-l-shdw dark:border-none dark:bg-d-bg-03dp dark:shadow-none">
      {files.length > 0 ? (
        files.map((n, i) => (
          <PendingVideoCard file={n} isPending={isPending} key={i} />
        ))
      ) : (
        <section className="text-red-400">
          <h2 className="text-gray dark:text-white/60">
            No videos are currently being processed.
          </h2>
        </section>
      )}
    </main>
  );
}
