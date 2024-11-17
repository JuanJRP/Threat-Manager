"use client";

import React, { useState } from "react";
import updateFormConfig from "../utils/updateFormConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface FormProps {
  id: string;
  module: keyof typeof updateFormConfig;
  updateData?: (data: any) => Promise<any>;
}

const UpdateForm = ({ id, module, updateData }: FormProps) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [message, setMessage] = useState<string | null>(null);

  const schema: any = updateFormConfig[module];

  const updateMutation = useMutation({
    mutationFn: async (data: { [key: string]: any }) =>
      updateData ? updateData(id) : Promise.reject("updateData is undefined"),
    onSuccess: (data) => {
      queryClient.setQueryData([module, { id }], data);
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {schema.map((field: any) => {
          if (field.type === "select") {
            const options = "options" in field ? field.options : [];
          }
        })}
      </form>
    </>
  );
};

export default UpdateForm;
