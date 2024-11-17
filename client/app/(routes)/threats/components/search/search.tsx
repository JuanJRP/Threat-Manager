// client/app/components/filters/searchfilter.tsx
import { ChangeEvent } from "react";

interface SearchFilterProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const Search: React.FC<SearchFilterProps> = ({ searchTerm, onSearch }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

return (
  <div className="">
    <input
      type="text"
      placeholder="Buscar amenaza..."
      value={searchTerm}
      onChange={handleChange}
      className="rounded p-1 w-1/2 border-solid border-2 border-black"
    />
  </div>
);

};

export default Search;
