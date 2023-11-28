import { useEffect, useState, KeyboardEvent, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { useDebouncedQuery } from "../lib";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const fetchQuery = useDebouncedQuery(query);
  const inputElement = useRef<HTMLInputElement>(null);

  function handleOpen() {
    if (inputElement.current) {
      inputElement.current.focus();
      setIsOpen(true);
    }
  }

  useEffect(() => {
    fetchQuery && console.log(fetchQuery);
  }, [fetchQuery]);

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>): void {
    if (e.key === "Escape") setIsOpen(false);
  }

  return (
    <div
      className="flex basis-1/2 items-center rounded-full border border-l-brdr bg-l-bg-1 pl-6 pr-4 shadow-md shadow-l-shdw dark:border-none dark:bg-d-bg dark:shadow-none"
      onKeyDown={handleKeyDown}
    >
      <button
        className="w-full text-left font-poppins text-sm leading-8 text-gray"
        type="button"
        onClick={handleOpen}
      >
        Search for videos...
      </button>
      <IoSearch className="text-gray hover:cursor-pointer" />
      <div
        className={`fixed inset-0 flex min-h-full w-full justify-center bg-slate-900/25 backdrop-blur transition-opacity dark:bg-black/25 ${
          isOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0 duration-200 ease-in"
        }`}
      >
        <div
          className={`absolute z-50 mt-4 flex w-1/2 transform items-center rounded-full bg-l-bg-2 pl-6 pr-4 shadow-md shadow-l-shdw transition-all focus-within:ring-2 focus-within:ring-blue-400 dark:border-none dark:bg-d-bg-03dp dark:shadow-none ${
            isOpen
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 duration-200 ease-in"
          }`}
        >
          <input
            value={query}
            ref={inputElement}
            onChange={(e) => setQuery(e.currentTarget.value)}
            className="w-full bg-transparent leading-10 outline-none"
            placeholder="Search for videos..."
          />
          <IoSearch
            className="text-gray"
            onClick={() => console.log(fetchQuery)}
          />
        </div>
        <div className="h-full w-full" onClick={() => setIsOpen(false)} />
      </div>
    </div>
  );
}
