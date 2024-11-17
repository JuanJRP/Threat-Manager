"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import Table from "./components/Table";
import Modal from "./components/Modal";
import DeleteModal from "./components/DeleteModal";
import DatosRiskType from "./interfaces/datosrisktype";

const API_BASE_URL = "http://localhost:3001/api/risk_type";

const RiskTypePage: React.FC = () => {
  const [data, setData] = useState<DatosRiskType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<DatosRiskType | null>(null);

  // Obtener datos desde el backend
  const fetchData = async () => {
    try {
      const response = await fetch(API_BASE_URL);

      if (!response.ok) {
        throw new Error("Error al obtener los tipos de riesgo.");
      }

      const riskTypes: DatosRiskType[] = await response.json();
      console.log("Datos obtenidos:", riskTypes); // Para depuración
      setData(riskTypes);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      alert("No se pudo cargar la lista de tipos de riesgo.");
    }
  };

  // Hook para cargar los datos al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Agregar un nuevo tipo de riesgo
  const handleAddData = async (newData: Omit<DatosRiskType, "id">) => {
    console.log("Intentando agregar tipo de riesgo:", JSON.stringify(newData, null, 2));
    try {
      const response = await fetch("http://localhost:3001/api/risk_type", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newData.name,
          integrity: newData.integrity,
          confidentiality: newData.confidentiality,
          availability: newData.availability,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error al agregar:", response.status, errorText);
        throw new Error(`Error al agregar: ${response.status}`);
      }

      const createdRisk: DatosRiskType = await response.json();
      console.log("Tipo de riesgo creado:", createdRisk);
      setData((prevData) => [...prevData, createdRisk]);
      setIsModalOpen(false); // Cierra el modal después de agregar
    } catch (error) {
      console.error("Error al agregar el tipo de riesgo:", error);
      alert("No se pudo agregar el tipo de riesgo.");
    }
  };

  // Eliminar un tipo de riesgo
  const handleDeleteConfirm = async () => {
    if (!selectedRisk) return;

    try {
      console.log("Intentando eliminar tipo de riesgo con ID:", selectedRisk.id);
      const response = await fetch(`${API_BASE_URL}/${selectedRisk.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el tipo de riesgo.");
      }

      setData((prevData) =>
        prevData.filter((item) => item.id !== selectedRisk.id)
      );
      setIsDeleteModalOpen(false);
      setSelectedRisk(null);
    } catch (error) {
      console.error("Error al eliminar el tipo de riesgo:", error);
      alert("No se pudo eliminar el tipo de riesgo.");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar title="Gestión de Tipos de Riesgo" />

      {/* Botón para agregar */}
      <div className="flex justify-center mt-10">
        <Button value="Agregar Tipo de Riesgo" onClick={() => setIsModalOpen(true)} />
      </div>

      {/* Tabla de datos */}
      <div className="mt-10 flex justify-center">
        <Table
          data={data}
          onDelete={(id) => {
            const risk = data.find((item) => item.id === id);
            if (risk) {
              setSelectedRisk(risk);
              setIsDeleteModalOpen(true);
            }
          }}
        />
      </div>

      {/* Modal para agregar */}
      {isModalOpen && (
        <Modal
          name="Agregar Tipo de riesgo"
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddData}
          existingData={data} // Aquí pasamos correctamente los datos existentes
        />
      )}

        {isDeleteModalOpen && selectedRisk ? (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            name="Confirmar Eliminación"
            riskName={selectedRisk ? String(selectedRisk.name) : ""} 
            onConfirm={handleDeleteConfirm}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedRisk(null);
            }}
          />
        ) : null}

    </div>
  );
};

export default RiskTypePage;
