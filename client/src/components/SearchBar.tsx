import { useState, KeyboardEvent, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { useSearchSuggestions } from "../lib";
import { NavIcon, SearchSuggestion } from ".";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { suggestions } = useSearchSuggestions(query);
  const inputElement = useRef<HTMLInputElement>(null);

  function handleOpen() {
    if (inputElement.current) {
      inputElement.current.focus();
      setIsOpen(true);
    }
  }
  // in search page const[searchParams] = useSearchParams();
  // const query = searchParams.get('q)

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>): void {
    if (e.key === "Escape") setIsOpen(false);
  }

  return (
    <div onKeyDown={handleKeyDown} className="flex items-center">
      <NavIcon>
        <button type="button" onClick={handleOpen}>
          <IoSearch className="h-4 w-4 lg:h-6 lg:w-6" />
        </button>
      </NavIcon>
      <div
        className={`fixed inset-0 z-10 flex min-h-full w-full flex-col items-center bg-slate-900/25 backdrop-blur transition-opacity dark:bg-black/25 ${
          isOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0 duration-200 ease-in"
        }`}
      >
        <div
          className={`z-40 mt-4 flex w-1/2 transform items-center bg-l-bg-2 pl-6 pr-4 shadow-md shadow-l-shdw transition-all focus-within:ring-2 focus-within:ring-blue-400 dark:bg-d-bg-03dp dark:shadow-none ${
            isOpen
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 duration-200 ease-in"
          } ${suggestions.length < 1 ? "rounded-md" : "rounded-t-md"}`}
        >
          <input
            value={query}
            ref={inputElement}
            onChange={(e) => setQuery(e.currentTarget.value)}
            className="w-full bg-transparent leading-10 outline-none"
            placeholder="Search for videos..."
          />
          <IoSearch className="text-gray" />
        </div>
        {suggestions.length > 1 && (
          <article className="z-30 mt-0 flex w-1/2 flex-col rounded-b-md bg-l-bg-2 p-2 shadow-md shadow-l-shdw dark:bg-d-bg-03dp dark:shadow-none">
            <ul className="list-none divide-y divide-l-brdr font-poppins text-sm empty:hidden dark:divide-d-bg-12dp lg:text-base">
              {suggestions.map((n, i) => (
                <SearchSuggestion
                  result={n}
                  key={i}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </ul>
          </article>
        )}
        <div
          className="absolute z-20 h-full w-full"
          onClick={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}
