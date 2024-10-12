// client/app/components/forms/form.tsx
import { useState, ChangeEvent } from "react";
import Button from "../buttons/button";

interface FormProps {
  initialData?: { name: string; description: string; classification: string };
  onSubmit: (data: { name: string; description: string; classification: string }) => void;
}

const Form: React.FC<FormProps> = ({ initialData = { name: "", description: "", classification: "Medio" }, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <form className="space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="border rounded w-full p-2"
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descripción"
        className="border rounded w-full p-2"
      />
      <select
        name="classification"
        value={formData.classification}
        onChange={handleChange}
        className="border rounded w-full p-2"
      >
        <option value="Alto">Alto</option>
        <option value="Medio">Medio</option>
        <option value="Bajo">Bajo</option>
      </select>
      <Button text="Guardar" onClick={handleSubmit} />
    </form>
  );
};

export default Form;
