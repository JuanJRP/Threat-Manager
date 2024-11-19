import React, { useEffect, useState } from "react";
import { Asset, Column } from "../Interface";
import { CircleX, Loader2 } from "lucide-react";

interface EditAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset | null;
  onAssetUpdated: () => void;
  columns: Column[];
  name: string;
}

const EditAssetModal: React.FC<EditAssetModalProps> = ({
  isOpen,
  onClose,
  asset,
  onAssetUpdated,
  columns,
  name,
}) => {
  const [formData, setFormData] = useState<Partial<Asset>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (asset) {
      // Solo inicializar los campos que están en las columnas visibles
      const visibleData: Partial<Asset> = {};
      columns.forEach((column) => {
        if (
          column.visible &&
          !column.exclude &&
          asset[column.key] !== undefined
        ) {
          visibleData[column.key] = asset[column.key];
        }
      });
      setFormData(visibleData);
    }
  }, [asset, columns]);

  const handleInputChange = (columnKey: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [columnKey]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = columns.filter(
      (col) => col.required && col.visible && !col.exclude
    );
    for (const field of requiredFields) {
      if (
        !formData[field.key] ||
        formData[field.key].toString().trim() === ""
      ) {
        throw new Error(`El campo ${field.label} es requerido`);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!asset?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      validateForm();

      // Combinar los datos existentes con los actualizados para no perder campos no visibles
      const updatedAsset = {
        ...asset,
        ...formData,
      };

      const response = await fetch(
        `http://localhost:3001/api/assets/${asset.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAsset),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el activo");
      }

      onAssetUpdated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !asset) return null;

const visibleColumns = columns.filter(col => 
  col.visible && 
  col.key.toLowerCase() !== "id" && 
  col.key.toLowerCase() !== "extra_atributes"
);

const filteredColumns = visibleColumns
  .map(col => ({
    ...col,
    exclude: false
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 w-[700px] max-h-[80vh] overflow-y-auto rounded-2xl border-2 border-black">
        <div className="border-b-2 border-black p-2 flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold flex-grow text-center">
            Editar {name}
          </h2>
          <CircleX
            size={"2.5rem"}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {filteredColumns
              .filter((col) => col.visible && !col.exclude)
              .map((column) => (
                <div key={column.key}>
                  <label
                    htmlFor={column.key}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {column.label}
                    {column.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>
                  {column.type === "select" ? (
                    <select
                      id={column.key}
                      value={formData[column.key] || ""}
                      onChange={(e) =>
                        handleInputChange(column.key, e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required={column.required}
                    >
                      <option value="">Seleccionar</option>
                      {column.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : column.type === "date" ? (
                    <input
                      id={column.key}
                      type="date"
                      value={formData[column.key] || ""}
                      onChange={(e) =>
                        handleInputChange(column.key, e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required={column.required}
                    />
                  ) : (
                    <input
                      id={column.key}
                      type={column.type || "text"}
                      value={formData[column.key] || ""}
                      onChange={(e) =>
                        handleInputChange(column.key, e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required={column.required}
                    />
                  )}
                </div>
              ))}
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center gap-2 disabled:bg-purple-400"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAssetModal;
