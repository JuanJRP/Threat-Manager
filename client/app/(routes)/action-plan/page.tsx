"use client";
import Navbar from "../../components/Navbar";
import Search from "./components/Search";
import Filter from "./components/Filter";
import Image from "next/image";
import Table from "./components/Table";
import Button from "../../components/Button";
import { FaPlusCircle } from "react-icons/fa";
import useModalStore from "../../store/modalStore";
import Modal from "../../components/Modal";
import Input from "./components/Input";
import Select from "./components/Select";
import BgActionPlan from "@/app/public/BgActionPlan.png";

export default function Home() {
  const { openModal } = useModalStore();
  return (
    <div>
      <Navbar title="PLAN DE ACCION" />
      <header className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5 bg-cPurple-100 h-64 w-[670px] p-4 py-10 rounded-xl shadow-black shadow-md ">
          <Search />
          <Filter />
        </div>
        <div className="">
          <Image
            src={BgActionPlan}
            alt="Background Action Plan"
            width={800}
            height={300}
          />
        </div>
      </header>
      <div className="flex text-center justify-center">
        <Button value="Agregar Plan de Accion" icon=<FaPlusCircle className="mr-2 size-6" /> onClick={openModal} />
        <Modal name="Agregar Plan de Accion">
          <main className="flex">
            <div className="flex flex-col gap-10 mr-10">
              <Select title="Residual Risk" option="Seleccionar" />
              <Input title="Treatment" type="text" placeholder="Escribe..." />
              <Input title="Action Plan" type="text" placeholder="Escribe..." />
              <Input title="Responsible" type="text" placeholder="Escribe..." />
              <Input title="Implementation Date" type="date" placeholder="dd/mm/yyyy"/>
              <Input title="Control Tracking" type="text" placeholder="Escribe..."/>

            </div>

            <div className="flex flex-col gap-10 mr-10">
              <Select title="State" option="Seleccionar" />
              <Input title="Monitoring" type="text" placeholder="Escribe..." />
              <Input title="Monitoring Date" type="date" placeholder="dd/mm/yyyy"/>
              <Input title="Indicator" type="text" placeholder="Escribe..." />
              <Input title="Risk" type="text" placeholder="Escribe..." />
              <Input title="Risk ID" type="text" placeholder="Escribe..." />
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
