import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function NavIcon({ children }: Props) {
  return (
    <section className="flex h-8 w-8 items-center justify-center rounded-full hover:cursor-pointer hover:bg-l-bg-4 dark:hover:bg-d-bg-12dp">
      {children}
    </section>
  );
}
