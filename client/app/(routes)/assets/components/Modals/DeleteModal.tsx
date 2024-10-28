import React from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 w-[400px] rounded-2xl border-2 border-black">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold text-center">
            ESTA SEGURO QUE DESEA ELIMINAR {itemName.toUpperCase()}
          </h2>
          
          <p className="text-gray-500 font-bold text-center">
            Esta operacion es irreversible
          </p>

          <div className="flex justify-center font-bold gap-4 w-full mt-4">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors text-lg min-w-[140px]"
            >
              Cancelar
            </button>
            
            <button
              onClick={onConfirm}
              className="px-8 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors text-lg min-w-[140px]"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;