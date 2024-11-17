import React, { useRef } from "react";
import { CircleX } from 'lucide-react';

interface CSVImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CSVImportModal = ({ isOpen, onClose, onFileSelect }: CSVImportModalProps) => {
  if (!isOpen) return null;

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-[400px] p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4"
          aria-label="Close"
        >
          <CircleX size={32} />
        </button>

        {/* Header */}
        <h2 className="text-center text-xl font-semibold bg-purple-500 text-white py-2 rounded-full mb-6 mt-6">
          Carga masiva de riesgos
        </h2>

        {/* Description */}
        <p className="text-center text-sm mb-6">
          Sube unicamente archivos en formato CSV o Excel. Asegúrate de que las columnas estén en el siguiente orden.
        </p>

        {/* Buttons */}
        <div className="space-y-3">
          <label className="block">
            <span className="sr-only">Examinar archivos</span>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={onFileSelect}
              className="hidden"
            />
            <button
              className="w-full py-3 px-6 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors"
            >
              Examinar
            </button>
          </label>

          <button
            className="w-full py-3 px-6 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            Subir Riesgos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CSVImportModal;