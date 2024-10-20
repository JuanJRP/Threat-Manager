import { IoMdCloseCircleOutline } from "react-icons/io";

type ModalFormProps = {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  name: string;
};

const Modal = ({ isVisible, onClose, children, name }: ModalFormProps) => {
  if (!isVisible) return null;

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
          <h2 className="text-2xl font-bold flex-grow text-center">
            Agregar {name}
          </h2>
          <IoMdCloseCircleOutline
            size={"2.5rem"}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
