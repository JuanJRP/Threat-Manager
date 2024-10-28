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
  const extraAttributes = currentAssets.reduce((acc, asset) => {
    if (asset.extra_atributes) {
      Object.keys(asset.extra_atributes).forEach((key) => {
        if (!acc.includes(key)) acc.push(key);
      });
    }
    return acc;
  }, [] as string[]);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns
              .filter((col) => col.visible && col.key !== "extra_atributes")
              .map((column) => (
                <th
                  key={column.key}
                  className="px-8 py-4 text-left text-sm text-gray-700 uppercase tracking-wider font-semibold"
                >
                  {column.label}
                </th>
              ))}
            {/* Agregar columnas para atributos extra */}
            {extraAttributes.map((attr) => (
              <th
                key={attr}
                className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                {attr}
              </th>
            ))}
            <th className="px-8 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-gray-50">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentAssets.map((asset) => (
            <tr key={asset.id} className="hover:bg-gray-50">
              {columns
                .filter((col) => col.visible && col.key !== "extra_atributes")
                .map((column) => (
                  <td
                    key={column.key}
                    className="px-8 py-5 whitespace-nowrap text-base text-gray-500"
                  >
                    {asset[column.key]?.toString() || ""}
                  </td>
                ))}
              {/* Mostrar valores de los atributos extra */}
              {extraAttributes.map((attr) => (
                <td
                  key={attr}
                  className="px-8 py-5 whitespace-nowrap text-base text-gray-500"
                >
                  {asset.extra_atributes?.[attr]?.toString() || ""}
                </td>
              ))}
              <td className="px-8 py-5 whitespace-nowrap text-base text-gray-500 text-center sticky right-0 bg-white">
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
