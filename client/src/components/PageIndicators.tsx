type Props = {
  arr: unknown[];
  onSelect: (index: number) => void;
  currentPage: number;
};

export function PageIndicators({ arr, onSelect, currentPage }: Props) {
  return (
    <div className="mt-auto flex items-center gap-x-4">
      {arr.map((_, i) => (
        <div
          key={i}
          onClick={() => onSelect(i)}
          className={`select-none rounded-md bg-silver px-2 py-1 shadow-md hover:cursor-pointer hover:text-aquamarine dark:bg-void ${
            currentPage === i ? "text-aquamarine" : ""
          }`}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}
