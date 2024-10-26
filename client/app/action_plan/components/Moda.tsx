import { IoMdCloseCircleOutline } from "react-icons/io";

type ModalFormProps = {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const Modal = ({ isVisible, onClose, children }: ModalFormProps) => {
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
      <div className="w-4/5 flex flex-col bg-cPurple-50 p-2 rounded-2xl border-2 border-black">
        <div className="border-b-2 border-black p-2">
          <IoMdCloseCircleOutline
            size={"2.5rem"}
            className="place-self-end cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;