"use client";
import { useState } from "react";
import Modal from "./components/modals/modal";
import Form from "./components/forms/form";
import Button from "./components/buttons/button";
import Table from "./components/tables/table";
import SearchFilter from "./components/filters/searchfilter"; 
import Import from "./components/import/import"; 
import Papa from 'papaparse'; 

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([
    { id: 1, name: "Riesgo 1", description: "Descripción del Riesgo 1", classification: "Alto" },
    { id: 2, name: "Riesgo 2", description: "Descripción del Riesgo 2", classification: "Medio" },
    { id: 3, name: "Riesgo 3", description: "Descripción del Riesgo 3", classification: "Bajo" },
  ]);
  const [editRow, setEditRow] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleFormSubmit = (newData: { name: string; description: string; classification: string }) => {
    if (editRow) {
      setData(data.map((row) => (row.id === editRow.id ? { ...row, ...newData } : row)));
      setEditRow(null);
    } else {
      setData([...data, { ...newData, id: data.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  const handleEdit = (row: any) => {
    setEditRow(row);
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

  // Filtrar los datos basados en el término de búsqueda
  const filteredData = data.filter((row) => 
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para insertar datos en la base de datos
  const insertDataToDatabase = async (newData: any[]) => {
    try {
      const response = await fetch('/api/risks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error('Error al insertar datos en la base de datos');
      }

      const result = await response.json();
      console.log('Datos insertados:', result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-cPurple-500 text-3xl font-bold mb-4 text-center bg-cPurple-100 p-2 rounded">
        Gestion Tipos de Riesgos
      </h1>

      <div className="mb-4 flex space-x-2">
        <SearchFilter searchTerm={searchTerm} onSearch={setSearchTerm} />
        <Button text="Agregar Tipo de Riesgo" onClick={() => setIsModalOpen(true)} />
        <Button text="Importar Tipos de Riesgos" onClick={() => setIsImportModalOpen(true)} /> {/* Botón de importación */}
      </div>

      <Table data={filteredData} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditRow(null);
        }}
        title={editRow ? "Editar Tipo de Riesgo" : "Agregar Tipo de Riesgo"}
      >
        <Form onSubmit={handleFormSubmit} initialData={editRow || { name: "", description: "", classification: "Medio" }} />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmación de Eliminación"
      >
        <p>¿Está seguro de que desea eliminar este riesgo?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <Button text="Cancelar" onClick={() => setIsDeleteModalOpen(false)} color="bg-gray-300 hover:bg-gray-400" />
          <Button text="Eliminar" onClick={confirmDelete} color="bg-red-500 hover:bg-red-700" />
        </div>
      </Modal>

      {/* Modal de Importación */}
      <Import 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
        onImport={(newData) => {
          // Llama a la función para insertar los datos en la base de datos
          insertDataToDatabase(newData); 
          // Actualiza el estado de data si es necesario
          setData((prevData) => [...prevData, ...newData]);
          setIsImportModalOpen(false); 
        }}
      />
    </div>
  );
}
