import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDebouncedQuery } from "../lib";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const fetchQuery = useDebouncedQuery(query);

  useEffect(() => {
    fetchQuery && console.log(fetchQuery);
  }, [fetchQuery]);

  return (
    <section className="flex basis-1/2 items-center rounded-full border border-l-brdr bg-l-bg-1 pl-6 pr-4 shadow-md shadow-l-shdw dark:border-none dark:bg-d-bg dark:shadow-none">
      <button
        className="w-full text-left font-poppins text-sm leading-8 text-gray"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Search for videos...
      </button>
      <IoSearch className="text-gray hover:cursor-pointer" />
      {isOpen && (
        <div className="fixed inset-0 flex min-h-full w-full justify-center">
          <div className="absolute z-50 mt-4 flex w-1/2 items-center rounded-full bg-l-bg-2 pl-6 pr-4 shadow-md shadow-l-shdw focus-within:ring-2 focus-within:ring-blue-400 dark:border-none dark:bg-d-bg-03dp dark:shadow-none">
            <input
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
              autoFocus
              className="w-full bg-transparent leading-10 outline-none"
              placeholder="Search for videos..."
            />
            <IoSearch
              className="text-gray"
              onClick={() => console.log(fetchQuery)}
            />
          </div>
          <div
            className="h-full w-full bg-slate-900/25 backdrop-blur dark:bg-black/25"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}
    </section>
  );
}
