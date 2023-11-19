import { useLayoutEffect } from "react";

export function useTitle(title: string): void {
  useLayoutEffect(() => {
    document.title = title + " / Artus";
  }, [title]);
}
