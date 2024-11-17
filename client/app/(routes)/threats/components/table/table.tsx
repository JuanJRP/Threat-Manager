import Button from '@/app/components/Button';
import { FaTrash } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";
import { useState } from 'react';


interface TableRow {
    id: number ; 
    name: string;
    description: string ;
}
  
interface TableProps {
    
    data: TableRow[];
    onEdit: (row: TableRow) => void;
    onDelete: (id: number) => void;
}
  
const Table: React.FC<TableProps> = ({ data, onEdit, onDelete }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    return (
        <div className="overflow-y-auto max-h-[400px] rounded-md"> 
            <table className="min-w-full border border-gray-300 ">
                <thead className="bg-cPurple-100">
                <tr>
                    <th className="border px-2 py-2 w-12">ID</th>
                    <th className="border px-4 py-2 w-1/4">Nombre</th>
                    <th className="border px-4 py-2 w-1/2">Descripción</th>
                    <th className="border px-2 py-2 text-center w-20">Update</th>
                    <th className="border px-2 py-2 text-center w-20">Delete</th>
                </tr>
                </thead>
                <tbody>
                {data?.map((row) => (
                    <tr key={row.id} className="hover:bg-cPurple-50">
                    <td className="border px-2 py-2 text-center font-bold">{row.id}</td>
                    <td className="border px-2 py-2 text-center font-bold">{row.name}</td>
                    <td className="border px-4 py-2">{row.description}</td>
                    <td className="border px-2 py-2 text-center">
                        <Button value="Editar" onClick={() => onEdit(row)}  icon={<FaPencil />}/>
                    </td>
                    <td className="border px-2 py-2 text-center">
                        <Button value="Eliminar" onClick={() => onDelete(row.id)} color="bg-red-500 hover:bg-red-700" icon={<FaTrash />}/>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
  
  export default Table;