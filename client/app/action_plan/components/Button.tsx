import { IoMdAddCircleOutline } from "react-icons/io";

interface ButtonProps{
  text:string
}
  
const Button:React.FC<ButtonProps> = ({text}) =>{

  return (

      <button className="relative flex items-center justify-center bg-cPurple-800 hover:bg-cPurple-950 rounded-xl h-14 w-[512px] text-2xl text-white transition">
      <IoMdAddCircleOutline className="absolute size-10 left-3 "/>   
        {text}
      </button>

  );
}

export default Button;
