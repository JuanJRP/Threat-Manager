import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  setIsUserSearching: (boolean: boolean) => void
  setSearchQuery: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
 setIsUserSearching,
 setSearchQuery
}) => {
  const userSearching = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    if (!e.target.value) {
      setIsUserSearching(false)
    } else {
      setIsUserSearching(true)
    }
  }
  
  return (
    <div className="relative mb-5 w-[633px]">
      <Search className="absolute left-6 top-5 h-6 w-6 text-gray-800" />
      <input
        onChange={userSearching}
        type="text"
        placeholder="Buscar plan de accion..."
        className="w-full pl-16 pr-6 py-4 rounded-xl border border-gray-800 text-lg"
      />
    </div>
  );
};

export default SearchBar;
