import { ReactNode } from "react";

type Props = {
  show: boolean;
  children: ReactNode;
  onClick?: (val?: any) => any;
  isLast?: boolean;
};

export function MenuItem({ show, children, onClick, isLast }: Props) {
  return (
    <>
      {show && (
        <div
          className={`${
            isLast ? "border-b-thin border-silver dark:border-gray" : ""
          } flex items-center gap-x-2 px-6 py-4 hover:cursor-pointer hover:bg-black/10`}
          onClick={onClick}
        >
          {children}
        </div>
      )}
    </>
  );
}
