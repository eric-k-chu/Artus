type Props = {
  arr: unknown[];
  onSelect: (index: number) => void;
  currentPage: number;
};

export function PageIndicators({ arr, onSelect, currentPage }: Props) {
  function handlePageNav(index: number, dir: "prev" | "next"): void {
    if (dir === "prev") {
      onSelect((index - 1 + arr.length) % arr.length);
    } else {
      onSelect((index + 1) % arr.length);
    }
  }

  return (
    <>
      {arr.length > 1 && (
        <section className="self-end font-poppins">
          <ul className="mt-auto flex items-center rounded-md border border-l-brdr bg-l-bg-3 shadow-sm shadow-l-shdw hover:cursor-pointer dark:border-none dark:bg-d-bg-12dp dark:shadow-none">
            <li
              key="prev"
              className="px-3 py-1"
              onClick={() => handlePageNav(currentPage, "prev")}
            >
              {"<"}
            </li>
            {arr.map((_, i) => (
              <li
                key={i}
                onClick={() => onSelect(i)}
                className={`px-4 py-2 text-sm ${
                  currentPage === i
                    ? "bg-l-p text-white/90 dark:bg-d-p"
                    : "bg-transparent text-gray hover:text-black dark:text-white/60 dark:hover:text-white/90"
                }`}
              >
                {i + 1}
              </li>
            ))}
            <li
              key="next"
              className="px-3 py-1"
              onClick={() => handlePageNav(currentPage, "next")}
            >
              {">"}
            </li>
          </ul>
        </section>
      )}
    </>
  );
}
