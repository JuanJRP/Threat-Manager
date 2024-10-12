interface ButtonProps {
    text: string; 
    onClick: () => void; 
    color?: string; 
  }
  
  const Button: React.FC<ButtonProps> = ({ text, onClick, color = "bg-cPurple-500" }) => {
    const baseStyle =
      "text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all";
  
    return (
      <button
        onClick={onClick}
        className={`${baseStyle} ${color}`}
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  