import { useEffect } from "react";
import { usePaginationStore } from "../store/paginationStore";
import Button from "./Button";
import Link from "next/link";

type TableProps<T> = {
  data: T[];
  columns: string[];
  columnNames?: { [key: string]: string };
  details: string | number;
};

const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, key) => acc && acc[key], obj);
};

const Table = <T,>({ data, columns, columnNames, details }: TableProps<T>) => {
  const {
    currentPage,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage,
    setTotalItems,
  } = usePaginationStore();

  useEffect(() => {
    setTotalItems(data.length);
  }, [data, setTotalItems]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  const goPrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  return (
    <div className="w-4/5 mx-auto p-4 overflow-x-auto flex flex-col">
      <table className="table-auto border-collapse border border-gray-300 rounded-lg w-full">
        {/* Encabezados */}
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2"></th>
            {columns.map((column) => (
              <th className="border border-gray-300 p-2" key={column}>
                {columnNames && columnNames[column]
                  ? columnNames[column]
                  : column}
              </th>
            ))}
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-50">
              <th className="border border-gray-300 p-2">
                <label>
                  <input
                    type="checkbox"
                    className="checkbox border-cPurple-300 [--chkbg:theme(colors.cPurple.600)] [--chkfg:theme(colors.cPurple.50)] checked:border-cPurple-900"
                  />
                </label>
              </th>
              {columns.map((column) => (
                <td className="border border-gray-300 p-2" key={column}>
                  {getNestedValue(row, column)}
                </td>
              ))}
              <td className="border border-gray-300 p-2">
                <button className="btn btn-ghost btn-xs">
                  <Link
                    href={`http://localhost:3001/${details}/${getNestedValue(
                      row,
                      "id"
                    )}`}
                  >
                    Detalles
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginación */}
      <div className="flex justify-between items-center py-4 gap-x-2">
        <Button
          value="Anterior"
          onClick={goPrevPage}
          disabled={currentPage === 1}
        />
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <Button
          value="Siguiente"
          onClick={goNextPage}
          disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
};

export default Table;
