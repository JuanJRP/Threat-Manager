import React, { useEffect, useState } from "react";
import { Asset, Column } from "../Interface";
import { CircleX } from "lucide-react";

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
        if (column.visible && asset[column.key] !== undefined) {
          visibleData[column.key] = asset[column.key];
        }
      });
      setFormData(visibleData);
    }
  }, [asset, columns]);

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!asset?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      // Combinar los datos existentes con los actualizados para no perder campos no visibles
      const updatedAsset = {
        ...asset,
        ...formData,
      };

      const response = await fetch(
        `http://localhost:3001/api/assets/${asset.id}`,
        {
          method: "PUT",
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 w-[800px] max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-black">
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
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campos visibles en la tabla */}
          <div className="grid grid-cols-2 gap-4">
            {columns
              .filter((col) => col.visible)
              .map((column) => (
                <div key={column.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {column.label}
                  </label>
                  <input
                    type="text"
                    value={formData[column.key] || ""}
                    onChange={(e) =>
                      handleInputChange(column.key, e.target.value)
                    }
                    disabled={column.key === "id"} // Deshabilitar el campo ID
                    className={`w-full p-2 border rounded-md ${
                      column.key === "id"
                        ? "bg-gray-50 text-gray-500"
                        : "focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    }`}
                    placeholder={`Enter ${column.label}`}
                    title={column.label}
                  />
                </div>
              ))}
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:bg-purple-300"
            >
              {isLoading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAssetModal;
