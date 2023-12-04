import { ErrorNotice, VideoCard, LoadingCircle } from "../components";
import { SearchResults, fetchSearchResults, useTitle } from "../lib";
import { FormEvent, useEffect, useRef, useState } from "react";
import { IoPerson, IoSearch } from "react-icons/io5";
import { TbZoomQuestion } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export function SearchPage() {
  const [searchedResults, setSearchResults] = useState<SearchResults>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputElement = useRef<HTMLInputElement>(null);
  useTitle("Search");

  useEffect(() => {
    if (!inputElement.current) return;

    inputElement.current.focus();
  }, []);

  async function handleSearch(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (query.length < 1) return;
    setIsLoading(true);
    try {
      const results = await fetchSearchResults(query.trim());
      setSearchResults(results);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <main className="mt-20 flex justify-center">
        <LoadingCircle />
      </main>
    );
  }

  if (error) {
    return <ErrorNotice error={error} />;
  }

  if (
    searchedResults &&
    searchedResults.videos.length < 1 &&
    searchedResults.users.length < 1
  ) {
    return (
      <>
        <main className="flex w-full justify-center">
          <form
            className="mt-10 flex h-fit w-1/2 items-center justify-center rounded-md border border-l-brdr bg-l-bg-1 pr-2 shadow-md shadow-l-shdw focus-within:ring-2 focus-within:ring-blue-400 dark:border-none dark:bg-d-bg-03dp dark:shadow-none"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
              ref={inputElement}
              placeholder="Search by caption, tags, or username"
              className="w-full bg-transparent p-2 font-poppins text-sm outline-none"
            />
            <button type="submit">
              <IoSearch className="text-gray" />
            </button>
          </form>
        </main>
        <div className="mt-20 flex w-3/4 flex-col items-center">
          <TbZoomQuestion className="h-10 w-10 text-gray dark:text-white/60" />
          <h3 className="mt-4 font-poppins text-lg text-gray dark:text-white/60">
            No results found.
          </h3>
        </div>
      </>
    );
  }

  return (
    <>
      <main className="flex w-full justify-center">
        <form
          className="mt-10 flex h-fit w-3/4 items-center justify-center rounded-md border border-l-brdr bg-l-bg-1 pr-2 shadow-md shadow-l-shdw focus-within:ring-2 focus-within:ring-blue-400 dark:border-none dark:bg-d-bg-03dp dark:shadow-none"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            ref={inputElement}
            placeholder="Search by caption, tags, or username"
            className="w-full bg-transparent p-2 font-poppins text-sm outline-none"
          />
          <button type="submit">
            <IoSearch className="text-gray" />
          </button>
        </form>
      </main>
      <div className="flex w-3/4 flex-col gap-y-8">
        <section className="mt-10 flex flex-col gap-2">
          {searchedResults &&
            searchedResults.users.map((n) => (
              <button
                key={n.userId}
                className="flex w-fit items-center gap-x-2 rounded-md border border-l-brdr bg-l-bg-1 p-2 shadow-md shadow-l-shdw hover:bg-l-bg-3 dark:border-none dark:bg-d-bg-03dp dark:shadow-none dark:hover:bg-d-bg-12dp"
                type="button"
                onClick={() => navigate(`/users/${n.userId}`)}
              >
                <IoPerson />
                <span className="font-poppins text-sm">{n.username}</span>
              </button>
            ))}
        </section>
        <section className="flex flex-wrap items-center gap-4">
          {searchedResults &&
            searchedResults.videos.map((n) => (
              <VideoCard video={n} key={n.videoId} />
            ))}
        </section>
      </div>
    </>
  );
}
