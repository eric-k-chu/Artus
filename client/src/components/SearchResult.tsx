import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {
  result: string;
  onClick: () => void;
};

export function SearchResult({ result, onClick }: Props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function handleSearch() {
    searchParams.set("q", result);
    navigate(`/search/results?${searchParams.toString()}`);
    onClick();
    // setSearchParams(searchParams);
  }

  return (
    <li
      className="flex items-center p-4 font-raleway text-xs lg:text-base"
      onClick={handleSearch}
    >
      <span>{result}</span>
    </li>
  );
}
