import Link from "next/link";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

interface NavProps {
  title: string;
}

const Nav: React.FC<NavProps> = ({ title }) => {
  return (

    <nav className=" text-cPurple-50 relative h-20 flex items-center justify-center w-full py-2 mb-5">
      <div className="bg-cPurple-950 relative h-full w-[100%] flex items-center justify-center rounded-xl">
        <Link href="/dashboard" className="flex items-center ">
          <FaRegArrowAltCircleLeft
            size={"2em"}
            className="absolute left-3 hover:brightness-75 transition cursor-pointer"
          />
        </Link>
        <h1 className="text-center font-semibold text-3xl">{title}</h1>
      </div>
    </nav>
  );
};

export default Nav;
