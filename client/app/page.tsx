import Button from "./components/Button";
import Nav from "./components/Navbar";
import { FaFaceSmile } from "react-icons/fa6";

export default function Home() {
  return (
    <div>
      <Nav title="Controles" />
      <h1 className="text-cPurple-500">Hello</h1>
      <p className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa sapiente
        quos nihil eaque consectetur ducimus iusto saepe excepturi nisi tempora.
      </p>
      <Button
        value="Hola"
        color="bg-cPurple-50"
        hover="hover:bg-cPurple-200"
        textColor="text-black-200"
        borderColor="border-2 border-green-600"
        icon={<FaFaceSmile />}
      />
    </div>
  );
}
