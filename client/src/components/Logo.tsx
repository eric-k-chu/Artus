import { useNavigate } from "react-router-dom";

export function Logo() {
  const navigate = useNavigate();

  return (
    <section
      className="flex items-center gap-x-2 hover:cursor-pointer"
      onClick={() => navigate("/")}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 100 104"
        className="fill-light-primary dark:fill-dark-primary"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M95.5 49.402C97.5 50.5567 97.5 53.4435 95.5 54.5982L29.5 92.7033C27.5 93.858 25 92.4146 25 90.1052V13.895C25 11.5856 27.5 10.1422 29.5 11.2969L95.5 49.402Z" />
        <path d="M9 5.21938C9 2.90483 11.51 1.46211 13.51 2.62711L17.51 4.95714C18.4326 5.49453 19 6.48175 19 7.54941V95.9265C19 96.9821 18.4453 97.96 17.5393 98.5015L13.5393 100.893C11.5396 102.088 9 100.647 9 98.3176V5.21938Z" />
      </svg>
    </section>
  );
}
