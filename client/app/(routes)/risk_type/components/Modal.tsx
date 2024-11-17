import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import DatosRiskType from "../../risk_type/interfaces/datosrisktype";
import Button from "../../../components/Button";

type ModalFormProps = {
  name: string; // Título del modal
  onSubmit: (newData: Omit<DatosRiskType, "id">) => void; // Función para manejar el envío
  onClose: () => void; // Función para cerrar el modal
  existingData: DatosRiskType[]; // Lista de datos existentes para validaciones
};

const Modal: React.FC<ModalFormProps> = ({ name, onSubmit, onClose, existingData }) => {
  const [formData, setFormData] = useState<Omit<DatosRiskType, "id">>({
    name: "",
    integrity: false,
    confidentiality: false,
    availability: false,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      setError("El nombre del riesgo es obligatorio.");
      return;
    }

    const isDuplicate =
      Array.isArray(existingData) &&
      existingData.some((item) => item.name.toLowerCase() === formData.name.toLowerCase());

    if (isDuplicate) {
      setError("El nombre del riesgo ya existe. Por favor, elige otro.");
      return;
    }

    setError(null);
    onSubmit(formData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="modal-wrapper"
      onClick={(e) => {
        if ((e.target as HTMLElement).id === "wrapper") onClose();
      }}
    >
      <div className="max-w-2xl flex flex-col bg-cPurple-50 p-2 rounded-2xl border-2 border-black">
        <div className="border-b-2 border-black p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold flex-grow text-center">{name}</h2>
          <IoMdCloseCircleOutline
            size={"2.5rem"}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>

        <div className="p-4">
          <label className="flex flex-col mb-4">
            <span>Nombre del riesgo:</span>
            <input
              type="text"
              name="name"
              value={typeof formData.name === "string" ? formData.name : ""}
              onChange={handleChange}
              placeholder="Escriba aquí el nombre del riesgo"
              className="form-input mt-1 border border-gray-400 p-2 rounded"
            />
          </label>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <label className="flex items-center space-x-3 mb-4">
            <input
              type="checkbox"
              name="integrity"
              checked={formData.integrity}
              onChange={handleCheckboxChange}
              className="form-checkbox"
            />
            <span>Integridad</span>
          </label>
          <label className="flex items-center space-x-3 mb-4">
            <input
              type="checkbox"
              name="confidentiality"
              checked={formData.confidentiality}
              onChange={handleCheckboxChange}
              className="form-checkbox"
            />
            <span>Confidencialidad</span>
          </label>
          <label className="flex items-center space-x-3 mb-4">
            <input
              type="checkbox"
              name="availability"
              checked={formData.availability}
              onChange={handleCheckboxChange}
              className="form-checkbox"
            />
            <span>Disponibilidad</span>
          </label>
        </div>

        <div className="flex justify-end p-4">
        <div className="mr-2">
          <Button value="Cancelar" onClick={onClose} />
        </div>
        <div>
          <Button value="Agregar" onClick={handleSubmit} />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Modal;
