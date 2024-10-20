import { MouseEventHandler } from "react";

type ButtonProps = {
  color?: string;
  value: string;
  hover?: string;
  textColor?: string;
  borderColor?: string;
  icon?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  color = "bg-cPurple-600",
  value,
  hover = "hover:bg-cPurple-800",
  textColor = "text-cPurple-50",
  borderColor,
  icon,
  onClick,
  type,
}: ButtonProps) => {
  return (
    <button
      className={`rounded-3xl flex justify-center items-center gap-1 px-8 py-2 font-semibold transition duration-300 ease-in-out border ${textColor} ${hover}  ${color} ${borderColor}`}
      onClick={onClick}
      type={type}
    >
      {icon ? icon : null}
      {value}
    </button>
  );
};

export default Button;
