import Nav from "./components/Nav";
import Search from "./components/Search";
import Filter from "./components/Filter";
import Button from "./components/Button";
import Image from "next/image";
import Table from "./components/Table";
import BgActionPlan from "../public/BgActionPlan.png"
import AddActionPlanModal from "./components/AddActionPlanModal";
import Modal from "./components/Moda";

export default function Home() {

  return (
    <div>
      <Modal isVisible={true}/>
      <Nav title="PLAN DE ACCION"/>

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
        <Button text="Agregar Plan de Accion" />
      </div>
      <main>
        <Table />
      </main>
    </div>
  );
}
