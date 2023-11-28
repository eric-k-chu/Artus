import { useNavigate } from "react-router-dom";

export function Logo() {
  const navigate = useNavigate();

  return (
    <section
      className="flex items-center gap-x-2 hover:cursor-pointer"
      onClick={() => navigate("/")}
    >
      <svg
        viewBox="0 0 151 137"
        className="h-[16px] w-[17px] stroke-l-p dark:stroke-d-p md:h-[24px] md:w-[26px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="10.2316"
          y1="122.714"
          x2="75.2316"
          y2="10.1308"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <line
          x1="10"
          y1="123"
          x2="83"
          y2="123"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <line
          x1="75.6603"
          y1="10.1308"
          x2="140.66"
          y2="122.714"
          strokeWidth="20"
          strokeLinecap="round"
        />
      </svg>
      <h1 className="select-none font-poppins text-sm md:text-base lg:text-xl">
        artus
      </h1>
    </section>
  );
}
