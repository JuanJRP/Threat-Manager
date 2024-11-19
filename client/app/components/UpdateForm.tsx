"use client";

import React, { useState } from "react";
import updateFormConfig from "../utils/updateFormConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "./Button";
import useModalStore from "../store/modalStore";
import { formConfig } from "../utils/formConfig";
import filterItemByFormConfig from "../utils/filterItem";

interface FormProps {
  id: string;
  module: keyof typeof updateFormConfig;
  updateData?: (data: any) => Promise<any>;
  item?: any;
}

const UpdateForm = ({ id, module, updateData, item }: FormProps) => {
  const queryClient = useQueryClient();

  const { closeUpdateModal } = useModalStore();

  const getProps = updateFormConfig
    ? updateFormConfig[module]?.map((field) => field.name)
    : formConfig[module]?.map((field) => field.name);

  const filteredItem = filterItemByFormConfig(item, getProps);

  const [formData, setFormData] = useState<{ [key: string]: any }>(
    filteredItem
  );
  const [message, setMessage] = useState<string | null>(null);

  const schema: any = updateFormConfig[module];

  const updateMutation = useMutation({
    mutationFn: updateData,
    onSuccess: (data) => {
      queryClient.setQueryData([module, { id }], data);
      queryClient.invalidateQueries({ queryKey: [module] });
      closeUpdateModal();
      setMessage("Actualizado con éxito");
      setTimeout(() => setMessage(null), 1000);
    },
    onError: (error) => {
      setMessage("Error al actualizar");
      setTimeout(() => setMessage(null), 1000);
      closeUpdateModal();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.target.type === "number"
      ? setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) })
      : setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-x-8 w-full max-w-lg max-h-[80vh] overflow-y-auto p-4"
      >
        {schema?.map((field: any) => (
          <div key={field.name} className="flex flex-col">
            <label>{field.label}</label>
            {field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field?.required}
                className="mt-1 p-2 border rounded shadow-md shadow-cPurple-600"
              >
                {field.options?.map((option: any) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field?.required}
                className="mt-1 rounded border-b border-cPurple-300 focus:outline-none focus:border-cPurple-600 focus:bg-cPurple-300 appearance-none"
              />
            )}
          </div>
        ))}
        <div className="col-span-2 flex justify-center mt-4">
          <Button value="Actualizar" type="submit" />
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

export default UpdateForm;
