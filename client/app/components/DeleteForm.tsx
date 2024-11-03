import React from "react";
import Button from "./Button";

interface DeleteFormProps {
  deleteAction?: () => void;
  closeAction?: () => void;
}

const DeleteForm = ({ deleteAction, closeAction }: DeleteFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl">
        ¿Confirmas que quieres eliminar este elemento?
      </h3>
      <span className="text-center text-gray-500">
        Este proceso no se puede revertir
      </span>
      <div className="flex gap-x-4 justify-center items-center">
        <Button
          value="Cancelar"
          color="cPurple-50"
          textColor="text-cPurple-600"
          borderColor="border border-cPurple-600"
          hover="hover:bg-cPurple-200"
          onClick={closeAction}
        />
        <Button value="Eliminar" onClick={deleteAction} />
      </div>
    </div>
  );
};

export default DeleteForm;
