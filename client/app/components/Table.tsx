import { useEffect, useState } from "react";
import { usePaginationStore } from "../store/paginationStore";
import Button from "./Button";
import Link from "next/link";
import { FaTrash } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useModalStore from "../store/modalStore";
import DeleteModal from "./DeleteModal";
import DeleteForm from "./DeleteForm";
import { FaInfoCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import UpdateModal from "./UpdateModal";
import UpdateForm from "./UpdateForm";
import updateFormConfig from "../utils/updateFormConfig";
import { formConfig } from "../utils/formConfig";

type TableProps<T> = {
  data: T[];
  columns: string[];
  columnNames?: { [key: string]: string };
  details: keyof typeof updateFormConfig | keyof typeof formConfig;
  deleteFunction?: (id: string) => Promise<void>;
  showDetails?: boolean;
  updateFunction: (id: string, data: any) => Promise<void>;
};

const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, key) => acc && acc[key], obj);
};

const Table = <T,>({
  data,
  columns,
  columnNames,
  details,
  deleteFunction,
  showDetails = false,
  updateFunction,
}: TableProps<T>) => {
  const {
    openDeleteModal,
    closeDeleteModal,
    openUpdateModal,
  } = useModalStore();

  const {
    currentPage,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage,
    setTotalItems,
  } = usePaginationStore();

  const queryClient = useQueryClient();

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setTotalItems(data?.length);
  }, [data, setTotalItems]);
     

  
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  const goPrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const deleteMutation = useMutation({
    mutationFn: deleteFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [details] });
      closeDeleteModal();
    },
    onError: () => {
      setMessage("No es posible eliminar este elemento");
      setTimeout(() => setMessage(null), 3000);
    },
  });

  return (
    <div className="w-11/12 mx-auto p-4  flex flex-col">
      <div className="overflow-auto">
        <table className="table-auto border-collapse border border-gray-300 rounded-lg w-full">
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
            {paginatedData?.map((row, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50">
                <th className="border border-gray-300 p-2"></th>
                {columns.map((column) => (
                  <td className="border border-gray-300 p-2" key={column}>
                    {getNestedValue(row, column)}
                  </td>
                ))}
                <td className="border border-gray-300">
                  <div className="flex items-center justify-around p-1">
                    {showDetails && (
                      <div className="tooltip" data-tip="Informacion adicional">
                        <Link
                          href={`http://localhost:3000/${details}/${getNestedValue(
                            row,
                            "id"
                          )}`}
                        >
                          <FaInfoCircle
                            className="text-cPurple-600 cursor-pointer"
                            size={"1rem"}
                          />
                        </Link>
                      </div>
                    )}
                    <div className="tooltip" data-tip="Editar">
                      <button onClick={openUpdateModal}>
                        <MdEdit size="1.25rem" className="text-cPurple-800" />
                      </button>
                    </div>
                    <div className="tooltip" data-tip="Eliminar">
                      <button onClick={openDeleteModal}>
                        <FaTrash className="text-red-500 cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </td>
                <>
                  <UpdateModal name="Actualizar">
                    <UpdateForm
                      id={getNestedValue(row, "id")}
                      item={row}
                      module={details}
                      updateData={(data) =>
                        updateFunction(getNestedValue(row, "id"), data)
                      }
                    />
                  </UpdateModal>
                  <DeleteModal name={`Confirmar eliminacion`}>
                    <DeleteForm
                      closeAction={closeDeleteModal}
                      deleteAction={() =>
                        deleteMutation.mutate(getNestedValue(row, "id"))
                      }
                    />
                    {message && (
                      <div
                        className={`mt-4 ${
                          message.includes("Error")
                            ? "bg-red-400"
                            : "bg-green-500"
                        }`}
                      >
                        <h3 className={`text-center p-2 my-4 rounded`}>
                          {message}
                        </h3>
                      </div>
                    )}
                  </DeleteModal>
                </>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
