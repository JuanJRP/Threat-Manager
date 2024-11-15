import { CiSearch } from "react-icons/ci";

function Search() {
    return (
      <div className="relative flex items-center justify-center border border-black bg-cPurple-50 rounded-xl h-14 w-full text-2xl">
        
        <CiSearch className="absolute size-8 bg-cPurple-50 left-6" />

        <input className="w-full bg-transparent text-center outline-none" 
          type="text" 
          placeholder="Buscar tipo de activo..." />
  
      </div>
    );
  }
  
  export default Search;
  