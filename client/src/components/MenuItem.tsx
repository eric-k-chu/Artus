import { ReactNode } from "react";

type Props = {
  show: boolean;
  children: ReactNode;
  onClick?: (val?: unknown) => unknown;
  isLast?: boolean;
};

export function MenuItem({ show, children, onClick, isLast }: Props) {
  return (
    <>
      {show && (
        <div
          className={`${
            isLast ? "border-b border-silver dark:border-void" : ""
          } flex items-center gap-x-2 px-6 py-4 hover:cursor-pointer hover:bg-silver dark:hover:bg-void`}
          onClick={onClick}
        >
          {children}
        </div>
      )}
    </>
  );
}
