import React, { useState } from 'react';
import { Loader2, CircleX } from 'lucide-react';
import axios from 'axios';

interface Column {
  key: string;
  label: string;
  type?: string;
  options?: string[];
  required?: boolean;
  visible?: boolean; 
  exclude?: boolean;
}

interface AddAssetModalProps {
  columns: Column[];
  isOpen: boolean;
  onClose: () => void;
  onAssetAdded: () => void;
  name: string;
  
}

const AddAssetModal: React.FC<AddAssetModalProps> = ({
  columns,
  isOpen,
  onClose,
  onAssetAdded,
  name,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleInputChange = (columnKey: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [columnKey]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await axios.post('http://localhost:3001/api/assets/', { formData });
      onAssetAdded();
      onClose();
      setFormData({});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al agregar el activo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 w-[700px] max-h-[80vh] overflow-y-auto rounded-2xl border-2 border-black">
        <div className="border-b-2 border-black p-2 flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold flex-grow text-center">
            Agregar {name}
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

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {columns
              .filter((col) => col.visible && !col.exclude)
              .map((column) => (
                <div key={column.key}>
                  <label
                    htmlFor={column.key}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {column.label}{' '}
                    {column.required && <span className="text-red-500">*</span>}
                  </label>
                  {column.type === 'select' ? (
                    <select
                      id={column.key}
                      value={formData[column.key] || ''}
                      onChange={(e) => handleInputChange(column.key, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Seleccionar</option>
                      {column.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : column.type === 'date' ? (
                    <input
                      id={column.key}
                      type="date"
                      value={formData[column.key] || ''}
                      onChange={(e) => handleInputChange(column.key, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  ) : (
                    <input
                      id={column.key}
                      type="text"
                      value={formData[column.key] || ''}
                      onChange={(e) => handleInputChange(column.key, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  )}
                </div>
              ))}
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? 'Guardando...' : 'Guardar Activo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAssetModal;
