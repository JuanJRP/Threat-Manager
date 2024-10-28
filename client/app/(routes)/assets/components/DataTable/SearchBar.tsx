import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="relative mb-5">
      <Search className="absolute left-6 top-4 h-6 w-6 text-gray-400" />
      <input
        type="text"
        placeholder="Buscar en todas las columnas..."
        className="w-full pl-16 pr-6 py-4 rounded-full border border-gray-200 text-lg"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
