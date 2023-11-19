import { useNavigate } from "react-router-dom";
import { IoPlayCircleOutline } from "react-icons/io5";

export function Logo() {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center gap-x-2 hover:cursor-pointer"
      onClick={() => navigate("/")}
    >
      <IoPlayCircleOutline className="text-aquamarine" size={32} />
      <h2 className="select-none font-poppins text-2xl font-thin">artus</h2>
    </div>
  );
}
