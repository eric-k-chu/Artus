import { IoCheckmark } from "react-icons/io5";
import { LoadingCircle } from ".";

type Props = {
  isPending: boolean | undefined;
  file: File;
};

export function PendingVideoCard({ isPending, file }: Props) {
  return (
    <section className="flex w-full items-center py-2">
      <h2>{file.name}</h2>
      <div className="ml-auto">
        {isPending ? (
          <LoadingCircle size="sm" />
        ) : (
          <IoCheckmark className="h-6 w-6 text-green-400" />
        )}
      </div>
    </section>
  );
}
