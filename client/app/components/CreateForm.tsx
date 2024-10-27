"use client";
import React from "react";
import Button from "./Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { formConfig } from "../utils/formConfig";
import { CiCirclePlus } from "react-icons/ci";

interface FormProps {
  module: keyof typeof formConfig;
  fetchFunctions?: Array<{ key: string; fetchFunction: () => Promise<any> }>;
  createData?: (data: any) => Promise<any>;
  needExtraAttributes?: boolean;
}

const CreateForm = ({
  module,
  fetchFunctions,
  createData,
  needExtraAttributes = false,
}: FormProps) => {
  const [formData, setFormData] = React.useState<{ [key: string]: any }>({});
  const [extraAtributes, setExtraAtributes] = React.useState<{
    [key: string]: any;
  }>({});
  const [newAttribute, setNewAttribute] = React.useState<{
    key: string;
    value: any;
  }>({ key: "", value: "" });
  const [message, setMessage] = React.useState<string | null>(null);

  const schema = formConfig[module];

  const fetchResults: any = {};

  fetchFunctions?.forEach(({ key, fetchFunction }) => {
    const { data } = useQuery({
      queryKey: [key],
      queryFn: async () => fetchFunction(),
    });
    fetchResults[key] = data;
  });

  const mutation = useMutation({
    mutationFn: async (data: { [key: string]: any }) =>
      createData
        ? createData({
            ...data,
            ...extraAtributes
          })
        : Promise.reject("createData is undefined"),
    onError: (error) => {
      setMessage("Error al crear");
      setTimeout(() => setMessage(null), 3000);
    },
    onSuccess: () => {
      setMessage("Creado con éxito");
      setFormData({});
      needExtraAttributes && setExtraAtributes({});
      setTimeout(() => setMessage(null), 3000);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, tagName } = e.target;
    const newValue =
      tagName === "SELECT"
        ? parseInt(value, 10)
        : type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : type === "number"
        ? parseFloat(value)
        : value;
    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleAttributeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAttribute((prevData) => ({ ...prevData, [name]: value }));
  };

  const addExtraAttribute = () => {
    if (newAttribute.key) {
      setExtraAtributes((prevData) => ({
        ...prevData,
        [newAttribute.key]: newAttribute.value,
      }));
      setNewAttribute({ key: "", value: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
  };


  console.log(extraAtributes);
  console.log(newAttribute);
  console.log(formData);
  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-x-8 w-full max-w-lg max-h-[80vh] overflow-y-auto p-4"
      >
        {schema.map((field) => {
          if (field.type === "select") {
            const options =
              "options" in field && field.options
                ? fetchResults[field.options]
                : [];

            return (
              <div key={field.name} className="flex flex-col">
                <label>{field.label}</label>
                <select
                  name={field.name}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded shadow-md shadow-cPurple-600"
                  required={field?.required}
                >
                  <option value="">Selecciona {field.label}</option>
                  {options?.map((option: any) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          if (field.type === "boolean") {
            return (
              <div key={field.name} className="flex flex-col">
                <label>{field.label}</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name={field.name}
                    onChange={handleChange}
                    className="mt-1 mr-2"
                  />
                  <span></span>
                </div>
              </div>
            );
          }

          return (
            <div key={field.name} className="flex flex-col">
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="mt-1 rounded border-b border-cPurple-300 focus:outline-none focus:border-cPurple-600 focus:bg-cPurple-300 appearance-none"
                required={field?.required}
              />
            </div>
          );
        })}
        {needExtraAttributes && (
          <div className="col-span-2 flex flex-col mt-4">
            <h3 className="text-lg font-semibold mb-4">Atributos Extra</h3>
            {Object.keys(extraAtributes).map((key) => (
              <div key={key} className="flex justify-between items-center">
                <span>
                  <b>Atributo</b> {key} | <b>Valor</b>: {extraAtributes[key]}
                </span>
              </div>
            ))}
            <div className="flex mt-2 gap-y-4 flex-wrap items-center justify-center">
              <input
                type="text"
                name="key"
                placeholder="Nombre del atributo"
                value={newAttribute.key}
                onChange={handleAttributeChange}
                className="mt-1 rounded border-b border-cPurple-300 focus:outline-none focus:border-cPurple-600 focus:bg-cPurple-300 appearance-none"
              />
              <input
                type="text"
                placeholder="Valor del atributo"
                name="value"
                value={newAttribute.value}
                onChange={handleAttributeChange}
                className="mt-1 rounded border-b border-cPurple-300 focus:outline-none focus:border-cPurple-600 focus:bg-cPurple-300 appearance-none"
              />
              <Button
                value=""
                onClick={addExtraAttribute}
                icon={<CiCirclePlus size={"2rem"} />}
              />
            </div>
          </div>
        )}
        <div className="col-span-2 flex justify-center mt-4">
          <Button type="submit" value="Crear" />
        </div>
      </form>
      {message && (
        <div
          className={`mt-4 ${
            message.includes("Error") ? "bg-red-400" : "bg-green-500"
          }`}
        >
          <h3 className={`text-center p-2 my-4 rounded`}>{message}</h3>
        </div>
      )}
    </div>
  );
};

export default CreateForm;
