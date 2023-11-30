import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {
  result: string;
  onClick: () => void;
};

export function SearchSuggestion({ result, onClick }: Props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function handleSearch() {
    searchParams.set("q", result);
    navigate(`/v/search?${searchParams.toString()}`);
    onClick();
    // setSearchParams(searchParams);
  }

  return (
    <li
      className="flex items-center rounded-md p-4 font-raleway text-xs hover:cursor-pointer hover:bg-l-bg-4 dark:hover:bg-d-bg-12dp lg:text-base"
      onClick={handleSearch}
    >
      <span>{result}</span>
    </li>
  );
}
