"use client";

import React, { useState } from "react";
import updateFormConfig from "../utils/updateFormConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "./Button";
import useModalStore from "../store/modalStore";

interface FormProps {
  id: string;
  module: keyof typeof updateFormConfig;
  updateData?: (data: any) => Promise<any>;
}

const UpdateForm = ({ id, module, updateData }: FormProps) => {

  const queryClient = useQueryClient();

  const {closeUpdateModal} = useModalStore();

  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [message, setMessage] = useState<string | null>(null);

  const schema: any = updateFormConfig[module];

  const updateMutation = useMutation({
    mutationFn: updateData,
    onSuccess: (data) => {
      queryClient.setQueryData([module, { id }], data);
      queryClient.invalidateQueries({queryKey: [module]});
      closeUpdateModal();
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.type === "number"
      ? setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) })
      : setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMutation.mutate(formData);
    
  };

  console.log("formData", formData);
  console.log("message", schema);
  return (
    <>
      <form onSubmit={handleSubmit}>
        {schema.map((field: any) => (
          <div key={field.name}>
            <label>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field?.required}
            />
          </div>
        ))}
        <Button value="Actualizar" type="submit"/>
      </form>
    </>
  );
};

export default UpdateForm;
