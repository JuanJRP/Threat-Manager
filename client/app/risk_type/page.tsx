"use client";
import { useState } from "react";
import Modal from "./components/modals/modal";
import Form from "./components/forms/form";
import Button from "./components/buttons/button";
import Table from "./components/tables/table";
import SearchFilter from "./components/filters/searchfilter";
import Import from "./components/import/import";
import DatosRiskType from "./interfaces/datosrisktype";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<DatosRiskType[]>([
    { id: 1, name: "Riesgo 1", description: "Descripción del Riesgo 1", classification: "Alto" },

  ]);
  const [editRow, setEditRow] = useState<DatosRiskType | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleFormSubmit = (newData: Omit<DatosRiskType, "id">) => {
    
    if (!newData.name.trim() || !newData.description.trim()) {
      setFormError("Todos los campos son obligatorios.");
      return; 
    }

    if (newData.classification === "Seleccionar") {
      setFormError("Por favor selecciona una clasificación válida.");
      return; 
    }

    // Si estamos en modo edición, actualizamos el registro existente
    if (editRow) {
      setData(data.map((row) => (row.id === editRow.id ? { ...row, ...newData } : row)));
      setEditRow(null);
    } else {
      
      setData([...data, { ...newData, id: data.length + 1 }]);
    }

   
    setFormError(null);
    setIsModalOpen(false);
  };

  const handleEdit = (row: DatosRiskType) => {
    setEditRow(row);
    setFormError(null); 
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setData(data.filter((row) => row.id !== deleteId));
      setDeleteId(null);
    }
    setIsDeleteModalOpen(false);
  };

  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#ededed] p-8">
      <h1 className="text-cPurple-500 text-3xl font-bold mb-4 text-center bg-cPurple-100 p-2 rounded">
        Gestión Tipos de Riesgos
      </h1>

      <div className="mb-4 flex space-x-2">
        <SearchFilter searchTerm={searchTerm} onSearch={setSearchTerm} />
        <Button text="Agregar Tipo de Riesgo" onClick={() => { 
          setEditRow(null); 
          setFormError(null); 
          setIsModalOpen(true); 
        }} />
        <Button text="Importar Tipos de Riesgos" onClick={() => setIsImportModalOpen(true)} />
      </div>

      <Table data={filteredData} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Modal para Agregar o Editar Riesgos */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditRow(null);
          setFormError(null); 
        }}
        title={editRow ? "Editar Tipo de Riesgo" : "Agregar Tipo de Riesgo"}
      >
        {formError && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {formError}
          </div>
        )}
        <Form
          onSubmit={handleFormSubmit}
          initialData={editRow || { name: "", description: "", classification: "Seleccionar" }}
        />
      </Modal>

      {/* Modal de Confirmación de Eliminación */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmación de Eliminación"
      >
        <p>¿Está seguro de que desea eliminar este tipo de riesgo?</p>
        <div className="flex justify-between mt-6 w-full">
          <Button text="Cancelar" onClick={() => setIsDeleteModalOpen(false)} color="bg-gray-300 hover:bg-gray-400" />
          <Button text="Eliminar" onClick={confirmDelete} color="bg-red-500 hover:bg-red-700" />
        </div>
      </Modal>

      {/* Modal para Importar Datos */}
      <Import
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={(newData) => {
          setData((prevData) => [...prevData, ...newData]);
          setIsImportModalOpen(false);
        }}
      />
    </div>
  );
}
