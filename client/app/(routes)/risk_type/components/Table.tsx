import React from "react";
import DatosRiskType from "../interfaces/datosrisktype";

type TableProps = {
  data: DatosRiskType[];
  onDelete: (id: number) => void; // Función para abrir el modal de eliminación
};

const Table: React.FC<TableProps> = ({ data, onDelete }) => {
  return (
    <div className="w-full mx-auto p-4 overflow-x-auto">
      {/* Contenedor de la tabla con altura fija y desplazamiento vertical */}
      <div className="max-h-96 overflow-y-auto">
        <table className="table-auto border-collapse border border-gray-300 rounded-lg w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2 text-center">ID</th>
              <th className="border border-gray-300 p-2 text-center">Nombre</th>
              <th className="border border-gray-300 p-2 text-center">Integridad</th>
              <th className="border border-gray-300 p-2 text-center">Confidencialidad</th>
              <th className="border border-gray-300 p-2 text-center">Disponibilidad</th>
              <th className="border border-gray-300 p-2 text-center">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 p-2 text-center font-bold">{item.id}</td>
                <td className="border border-gray-300 p-2 text-center">{item.name}</td>
                <td className="border border-gray-300 p-2 text-center">
                  {item.integrity ? "Sí" : "No"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {item.confidentiality ? "Sí" : "No"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {item.availability ? "Sí" : "No"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => onDelete(item.id)} // Llama a la función para abrir el modal
                    className="text-red-500 hover:text-red-700"
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
