// client/app/components/titles/title.tsx
interface TitleProps {
    text: string; 
  }
  
  const Title: React.FC<TitleProps> = ({ text }) => {
    return (
      <h1 className="text-cPurple-500 text-3xl font-bold mb-4 text-center bg-cPurple-100 p-2 rounded">
        {text}
      </h1>
    );
  };
  
  export default Title;
  