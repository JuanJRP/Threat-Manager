// client/app/components/import/import.tsx
import { useState } from "react";
import Button from "../buttons/button";
import Modal from "../modals/modal";
import Papa from "papaparse";
interface ImportProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: any[]) => void; 
}

const Import: React.FC<ImportProps> = ({ isOpen, onClose, onImport }) => {
  const [importFile, setImportFile] = useState<File | null>(null); 

  const handleUpload = () => {
    if (importFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        console.log(text); 
      };
      reader.readAsText(importFile);
    } else {
      alert("Por favor, selecciona un archivo CSV primero.");
    }
  };

  const handleImport = () => {
    if (importFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const results = Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
        });

        
        const newData = results.data.map((item: any) => ({
          name: item.name,
          description: item.description,
          classification: item.classification,
        }));

        
        onImport(newData);
      };
      reader.readAsText(importFile);
    } else {
      alert("Por favor, selecciona un archivo CSV primero.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Importar Tipos de Riesgos">
      <label htmlFor="csvFile" className="block mb-2">Subir datos en formato CSV:</label>
      <input 
        id="csvFile"
        type="file" 
        accept=".csv" 
        onChange={(e) => setImportFile(e.target.files ? e.target.files[0] : null)} 
        className="border rounded p-1 w-full" 
        placeholder="Selecciona un archivo CSV"
      />
      <div className="flex justify-between mt-6 w-full">
        <Button 
          text="Subir Datos" 
          onClick={handleUpload} 
          color="bg-gray-300 hover:bg-gray-400" 
        />
        <Button 
          text="Importar" 
          onClick={handleImport} 
          color="bg-blue-500 hover:bg-blue-700" 
        />
      </div>
    </Modal>
  );
};

export default Import;
