"use client";
import Button from "@/app/components/Button";
import Nav from "@/app/components/Navbar";
import React, { use } from "react";
import Search from "./components/search/search";
import { useState } from "react";
import DatosThreats from "./interfaces/interfaceThreats";
import { FaCirclePlus } from "react-icons/fa6";
import AddThreats from "./components/modals/addThreats";
import EditThreats from "./components/modals/editThreats";
import { Rows } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { createThreat, deleteThreat, getAllThreats } from "./threatServices";
import Modal from "@/app/components/Modal";
import CreateForm from "@/app/components/CreateForm";
import useModalStore from "@/app/store/modalStore";
import { warnOptionHasBeenMovedOutOfExperimental } from "next/dist/server/config";
import Table from "@/app/components/Table";
import Loading from "@/app/components/Loading";
import ErrorComponent from "@/app/components/ErrorComponent"; 

const Page: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editRow, setEditRow] = useState<DatosThreats | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [data, setData] = useState<DatosThreats[]>([]);

  const { openModal } = useModalStore();

  const { data: threats, isLoading, isError} = useQuery({
    queryKey: ["threats"],
    queryFn: async () => getAllThreats(),
  });
  console.log(threats);

  const filteredData = threats?.filter((row: any) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleEdit = (row: DatosThreats) => {
    setEditRow(row);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };
if (isLoading) return <Loading/>
if (isError) return <ErrorComponent/>

  return (
    <div className="bg-cPurple-100">
      <Nav title="Amenazas" />
      <div className="">
        <div className="flex  items-center px-4 ">
          <div className=" w-3/5 self-start">
            <Search searchTerm={searchTerm} onSearch={setSearchTerm} />
          </div>
          <div className="drop-shadow-2xl flex"></div>
        </div>

        <div className="drop-shadow-2xl flex mt-5 ml-4">
          <Button
            onClick={openModal}
            value="Agregar Amenaza"
            color="900"
            hover="hover: bg-cPurple-900"
            icon={<FaCirclePlus />}
          />
        </div>
      </div>
      <Table
        data={threats}
        columns={["name", "description"]}
        columnNames={{ ["name"]: "Nombre", ["description"]: "Descripción" }}
        details={"threats"}
        deleteFunction={deleteThreat}
      />
      <Modal name="Amenazas">
        <CreateForm module="threats" createData={createThreat} />
      </Modal>
      <EditThreats
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default Page;
