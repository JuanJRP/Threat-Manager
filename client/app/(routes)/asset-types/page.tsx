"use client";
import Navbar from "../../components/Navbar";
import Search from "./components/Search";
import Table from "./components/Table";
import Button from "../../components/Button";
import { FaPlusCircle } from "react-icons/fa";
import useModalStore from "@/app/store/modalStore";
import Modal from "../../components/Modal";
import Input from "./components/Input";
import Select from "./components/Select";

export default function Home() {
  const { openModal } = useModalStore();
  return (
    <div>
      <Navbar title="TIPO DE ACTIVO" />
      <header className="flex items-center justify-center mt-16 mb-8">
        <div className="flex flex-col items-center justify-center gap-5 bg-cPurple-100 h-64 w-[670px] p-4 py-10 rounded-xl shadow-black shadow-md ">
          <Search />
          <Button value="Agregar Tipo de Activo" icon=<FaPlusCircle className="mr-2 size-6" /> onClick={openModal} />
        </div>
      </header>
      <div className="flex text-center justify-center">

        <Modal name="Agregar Tipo de Activo">
          <main className="flex">
            <div className="flex flex-col gap-10 mr-10">
              <Input title="Name" type="text" placeholder="Escribe..." />
              <Input title="Description" type="text" placeholder="Escribe..." />
            </div>

            <div className="flex flex-col gap-10 mr-10">
              <Input title="Category" type="text" placeholder="Escribe..." />
              <Input title="Asset " type="date" placeholder="dd/mm/yyyy"/>
              <Select title="Risk" option="Seleccionar" />
            </div>
            
          </main>
          <Button value="Agregar"/>
        </Modal>
      </div>
      <main>
        <Table />
      </main>
    </div>
  );
}
