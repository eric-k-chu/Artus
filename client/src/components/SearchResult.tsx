import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {
  result: string;
  type: "Username" | "Captions" | "Tags";
};

export function SearcResult({ result, type }: Props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function handleSearch() {
    searchParams.set("q", result);
    navigate(`/search/results?${searchParams.toString()}`);
    // setSearchParams(searchParams);
  }

  return (
    <li
      className="flex items-center p-4 font-raleway text-xs lg:text-base"
      onClick={handleSearch}
    >
      <span>{result}</span>
      <span className="ml-auto text-gray dark:text-white/60">{type}</span>
    </li>
  );
}
