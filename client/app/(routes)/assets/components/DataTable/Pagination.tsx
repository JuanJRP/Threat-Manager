import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <div className="mt-4 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700 font-semibold">
            Mostrando {startIndex + 1} a{" "}
            {Math.min(endIndex, totalItems)} de{" "}
            {totalItems} registros
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          title="Previous Page"
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className={`p-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 "
              : "bg-purple-100 text-purple-700 hover:bg-purple-200"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="px-4 py-2 text-sm text-gray-700 font-semibold">
          Página {currentPage} de {totalPages}
        </span>
        <button
          title="Next Page"
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400"
              : "bg-purple-100 text-purple-700 hover:bg-purple-200"
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;