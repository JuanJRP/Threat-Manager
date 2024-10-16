interface ButtonProps {
  text: string;
  onClick?: () => void; 
  className?: string;
  color?: string;
  type?: "button" | "submit" | "reset"; 
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  color = "bg-cPurple-500",
  type = "button", 
}) => {
  const baseStyle =
    "text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all";

  return (
    <button
      onClick={onClick}
      type={type} 
      className={`${baseStyle} ${color}`}
    >
      {text}
    </button>
  );
};

export default Button;
