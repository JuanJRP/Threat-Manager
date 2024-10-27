import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { MouseEventHandler } from "react";

interface NavProps {
  title: string;
  onClick?: MouseEventHandler<SVGElement>;
}

const Nav: React.FC<NavProps> = ({ title, onClick }) => {
  return (
    <nav className="text-cPurple-50 relative h-20 flex items-center justify-center w-full py-2 mb-5">
      <div className="bg-cPurple-950 relative h-full w-[100%] flex items-center justify-center rounded-xl">
        <FaRegArrowAltCircleLeft
          size={"2em"}
          className="absolute left-3 hover:brightness-75 transition cursor-pointer"
          onClick={onClick}
        />
        <h1 className="text-center font-semibold text-3xl">{title}</h1>
      </div>
    </nav>
  );
};

export default Nav;
