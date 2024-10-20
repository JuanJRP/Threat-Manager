"use client";
import React from "react";
import Button from "./Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { formConfig } from "../utils/formConfig";

interface FormProps {
  module: keyof typeof formConfig;
  fetchFunctions?: Array<{ key: string; fetchFunction: () => Promise<any> }>;
  createData?: (data: any) => Promise<any>;
}

const CreateForm = ({ module, fetchFunctions, createData }: FormProps) => {
  const [formData, setFormData] = React.useState<{ [key: string]: any }>({});

  const schema = formConfig[module];

  const fetchResults: any = {};

  fetchFunctions?.forEach(({ key, fetchFunction }) => {
    const { data } = useQuery({
      queryKey: [key],
      queryFn: async () => fetchFunction(),
    });
    fetchResults[key] = data;
  });

  const riskMutation = useMutation({
    mutationFn: async (data: { [key: string]: any }) =>
      createData
        ? createData({ ...data })
        : Promise.reject("createData is undefined"),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, tagName } = e.target;
    const newValue =
      tagName === "SELECT"
        ? parseInt(value, 10)
        : type === "number"
        ? parseFloat(value)
        : value;
    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    riskMutation.mutate(formData);
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 w-full max-w-lg"
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
                <select name={field.name} onChange={handleChange} className="mt-1 p-2 border rounded shadow-md shadow-cPurple-600" required={field?.required}>
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
        <div className="col-span-2 flex justify-center mt-4">
          <Button type="submit" value="Crear" />
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
