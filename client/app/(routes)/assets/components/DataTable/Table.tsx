import React from "react";
import { Asset, Column } from "../Interface";
import { Trash2, PencilLine } from "lucide-react";

interface TableProps {
  columns: Column[];
  currentAssets: Asset[];
  onEdit: (asset: Asset) => void;
  onDelete: (assetId: string) => void;
}

const Table: React.FC<TableProps> = ({
  columns,
  currentAssets,
  onEdit,
  onDelete,
}) => {
  // Función para verificar si una columna tiene al menos un valor no vacío
  const hasValues = (columnKey: string): boolean => {
    return currentAssets.some((asset) => {
      const value = asset[columnKey];
      return value !== null && value !== undefined && value !== "";
    });
  };

  // Filtrar las columnas que tienen al menos un valor
  const visibleColumns = columns.filter(
    (col) => col.visible && col.key !== "extra_atributes" && hasValues(col.key)
  );

  // Procesar atributos extra y filtrar los que tienen valores
  const extraAttributes = currentAssets.reduce((acc, asset) => {
    if (asset.extra_atributes) {
      Object.entries(asset.extra_atributes).forEach(([key, value]) => {
        if (
          !acc.includes(key) &&
          value !== null &&
          value !== undefined &&
          value !== ""
        ) {
          acc.push(key);
        }
      });
    }
    return acc;
  }, [] as string[]);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-lg">
      <table className="min-w-full divide-y divide-gray-800 bg-gray-400">
        <thead>
          <tr>
            {visibleColumns.map((column) => (
              <th
                key={column.key}
                className="px-8 py-4 text-left text-sl text-black uppercase tracking-wider font-bold"
              >
                {column.label}
              </th>
            ))}
            {extraAttributes.map((attr) => (
              <th
                key={attr}
                className="px-8 py-4 text-left text-sl font-bold text-black uppercase tracking-wider"
              >
                {attr}
              </th>
            ))}
            <th className="px-8 py-4 text-center text-sl text-black uppercase tracking-wider font-bold sticky right-0 bg-gray-400">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-300 divide-y divide-gray-800">
          {currentAssets.map((asset) => (
            <tr key={asset.id} className="hover:bg-gray-50">
              {visibleColumns.map((column) => (
                <td
                  key={column.key}
                  className="px-8 py-5 whitespace-nowrap text-sl font-semibold text-black"
                >
                  {asset[column.key]?.toString() || ""}
                </td>
              ))}
              {extraAttributes.map((attr) => (
                <td
                  key={attr}
                  className="px-8 py-5 whitespace-nowrap text-sl font-semibold text-black"
                >
                  {asset.extra_atributes?.[attr]?.toString() || ""}
                </td>
              ))}
              <td className="px-8 py-5 whitespace-nowrap text-base text-black text-center sticky right-0 bg-gray-300 hover:bg-gray-50">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => onEdit(asset)}
                    className="flex px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-800 transition-colors font-semibold"
                  >
                    <PencilLine />
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(asset.id)}
                    className="flex px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 transition-colors font-semibold"
                  >
                    <Trash2 />
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;