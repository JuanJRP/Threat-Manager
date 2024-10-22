// client/app/components/filters/searchfilter.tsx
import { ChangeEvent } from "react";

interface SearchFilterProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ searchTerm, onSearch }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Buscar tipo de riesgos..."
      value={searchTerm}
      onChange={handleChange}
      className="border rounded p-1 w-1/2" 
    />
  );
};

export default SearchFilter;
