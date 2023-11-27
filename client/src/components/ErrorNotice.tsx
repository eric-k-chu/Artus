import { RiErrorWarningFill } from "react-icons/ri";

type Props = {
  error: unknown;
};

export function ErrorNotice({ error }: Props) {
  return (
    <main className="container flex flex-col items-center text-l-err dark:text-d-err">
      <RiErrorWarningFill size={40} className="mt-60" />
      <h2 className="font-poppins font-semibold leading-8">
        {error instanceof Error ? error.message : "An unknown error occurred."}
      </h2>
    </main>
  );
}
