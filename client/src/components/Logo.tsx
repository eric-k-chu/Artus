import { AppContext } from ".";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export function Logo() {
  const navigate = useNavigate();
  const { theme } = useContext(AppContext);

  return (
    <div
      className="flex items-center gap-x-2 hover:cursor-pointer"
      onClick={() => navigate("/")}
    >
      <img
        src={
          theme === "light" ? "/images/logo-d-36.png" : "/images/logo-l-36.png"
        }
      />
    </div>
  );
}
