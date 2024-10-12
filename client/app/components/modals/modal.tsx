// client/app/components/modals/modal.tsx

interface ModalProps {
    isOpen: boolean; 
    onClose: () => void; 
    children: React.ReactNode; 
    title?: string; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative font-barlow">
                
                <button
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    onClick={onClose}
                >
                    X
                </button>

               
                {title && <h2 className="text-lg font-bold text-center mb-4">{title}</h2>}

                
                {children}
            </div>
        </div>
    );
};

export default Modal;
