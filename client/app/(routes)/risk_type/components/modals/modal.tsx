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
                    className="absolute top-2 right-2 p-2 rounded-lg text-white bg-cPurple-400 hover:bg-cPurple-500 focus:outline-none focus:ring-2 focus:ring-cPurple-400 text-sm font-medium"
                    onClick={onClose}
                    aria-label="Cerrar"
                >
                    Cerrar
                </button>

                {title && <h2 className="text-lg font-bold text-center mb-4">{title}</h2>}

                {children}
            </div>
        </div>
    );
};

export default Modal;
