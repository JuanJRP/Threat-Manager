import { useState, ChangeEvent, FormEvent } from "react";
import Button from "../buttons/button";

interface FormProps {
  initialData?: { name: string; description: string; classification: string };
  onSubmit: (data: { name: string; description: string; classification: string }) => void;
}

const Form: React.FC<FormProps> = ({
  initialData = { name: "", description: "", classification: "Seleccionar" },
  onSubmit,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(""); 
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); 

  
    if (!formData.name.trim() || !formData.description.trim()) {
      setErrorMessage("Todos los campos son obligatorios.");
      return; 
    }

    if (formData.classification === "Seleccionar") {
      setErrorMessage("Por favor selecciona una clasificación válida.");
      return; 
    }

    onSubmit(formData); 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && ( 
        <div className="bg-red-100 text-red-700 p-2 rounded">
          {errorMessage}
        </div>
      )}

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre"
        className="border rounded w-full p-2"
        required
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descripción"
        className="border rounded w-full p-2"
        required
      />
      <label htmlFor="classification" className="block text-sm font-medium text-gray-700">
        Clasificación
      </label>
      <select
        id="classification"
        name="classification"
        value={formData.classification}
        onChange={handleChange}
        className="border rounded w-full p-2"
        required
      >
        <option value="Seleccionar">Seleccionar</option>
        <option value="Alto">Alto</option>
        <option value="Medio">Medio</option>
        <option value="Bajo">Bajo</option>
      </select>

      <Button text="Guardar" type="submit" /> 
    </form>
  );
};

export default Form;
