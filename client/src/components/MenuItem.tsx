import { ReactNode } from "react";

type Props = {
  show: boolean;
  children: ReactNode;
  onClick?: (val?: unknown) => unknown;
};

export function MenuItem({ show, children, onClick }: Props) {
  return (
    <>
      {show && (
        <li
          className="flex items-center gap-x-2 px-6 py-4 hover:cursor-pointer hover:bg-silver dark:hover:bg-d-bg-12dp"
          onClick={onClick}
        >
          {children}
        </li>
      )}
    </>
  );
}
