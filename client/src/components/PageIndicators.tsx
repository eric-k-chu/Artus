type Props = {
  arr: unknown[];
  onSelect: (index: number) => void;
  currentPage: number;
};

export function PageIndicators({ arr, onSelect, currentPage }: Props) {
  return (
    <div className="mt-auto flex items-center divide-x divide-silver rounded-md border border-silver">
      {arr.map((_, i) => (
        <div
          key={i}
          onClick={() => onSelect(i)}
          className={`select-none px-3 py-1 font-poppins text-sm hover:cursor-pointer dark:bg-void ${
            currentPage === i
              ? "bg-tea-rose text-black"
              : "bg-transparent text-gray"
          }`}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}
