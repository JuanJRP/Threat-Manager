import React, { useRef } from "react";
import { Plus, Settings } from "lucide-react";
import { BsFiletypeCsv } from "react-icons/bs";

interface ActionButtonsProps {
  onAddClick: () => void;
  onCSVImport: () => void;
  onSettingsClick: () => void;
  ButtonName: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onAddClick,
  onCSVImport,
  onSettingsClick,
  ButtonName,
}) => {

  return (
    <div className="grid grid-cols-3 gap-6 mb-5">
      <button
        onClick={onAddClick}
        className="flex items-center justify-center gap-3 bg-cPurple-900 text-white py-4 px-8 rounded-lg hover:bg-cPurple-700 transition-colors font-semibold text-lg"
      >
        <Plus className="w-6 h-6" />
        Agregar {ButtonName}
      </button>

      <div className="relative">
        <input
          type="file"
          accept=".csv"
          onChange={onCSVImport}
          className="hidden"
          id="csv-upload"
          title="Upload CSV file"
        />
        <button
          onClick={onCSVImport}
          className="w-full flex items-center justify-center gap-3 bg-cPurple-900 text-white py-4 px-8 rounded-lg hover:bg-cPurple-700 font-semibold transition-colors text-lg"
        >
          <BsFiletypeCsv className="w-6 h-6" />
          Importar CSV
        </button>
      </div>

      <button
        onClick={onSettingsClick}
        className="flex items-center justify-center gap-3 bg-cPurple-900 text-white py-4 px-8 rounded-lg hover:bg-cPurple-700 font-semibold transition-colors text-lg"
      >
        <Settings className="w-6 h-6" />
        Configurar Columnas
      </button>
    </div>
  );
};

export default ActionButtons;
