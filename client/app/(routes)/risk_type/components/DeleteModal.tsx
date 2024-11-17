import { IoMdCloseCircleOutline } from "react-icons/io";
import Button from "../../../components/Button"; // Importa tu botón si es necesario

type DeleteModalFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  riskName: string;
  name: string;
};

const DeleteModal = ({ isOpen, onClose, onConfirm, riskName, name }: DeleteModalFormProps) => {
  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "wrapper") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="max-w-2xl flex flex-col bg-cPurple-50 p-2 rounded-2xl border-2 border-black">
        <div className="border-b-2 border-black p-2 flex justify-between items-center">
          <h2 className="text-2xl font-bold flex-grow text-center">{name}</h2>
          <IoMdCloseCircleOutline
            size={"2.5rem"}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="p-4">
          <p className="text-center mb-6">¿Estás seguro de que deseas eliminar el riesgo "{riskName}"?</p>
          <div className="flex justify-around">
            <Button value="Eliminar" onClick={onConfirm} />
            <Button value="Cancelar" onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
