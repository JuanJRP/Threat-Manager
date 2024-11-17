import { Loader2, CircleX } from "lucide-react";

interface EditThreatsprops {
  onClose: () => void; 
  isOpen: boolean;
}
const EditThreats: React.FC<EditThreatsprops>= ({isOpen,onClose}) => {
    
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-6 w-[700px] max-h-[80vh] overflow-y-auto rounded-2xl border-2 border-black">
          <div className="border-b-2 border-black p-2 flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold flex-grow text-center">
              Editar Amenaza
            </h2>
            <CircleX
              onClick={onClose}
              size={"2.5rem"}
              className="cursor-pointer"
              
            />
          </div>
         
          
          <form>
            <div className="grid grid-cols-2 gap-4">
                <label>Id</label>
                <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"/>
                
                <label>Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"/>
                                
                <label>Descripcion</label>
                <input type="text"  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"/>
                
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                type="submit"
            
               
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center gap-2"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default EditThreats;
  