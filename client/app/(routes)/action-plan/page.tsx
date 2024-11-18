"use client";
import React, { useState, useEffect, use } from "react";
import Nav from "../../components/Navbar";
import SearchBar from "./components/SearchBar";
import Image from "next/image";
import BgActionPlan from "@/app/public/BgActionPlan.png";
import { ActionPlan } from "./components/interface";
import useModalStore from "@/app/store/modalStore";
import { useQuery } from "@tanstack/react-query";
import {
  CreateActionPlan,
  DeleteActionPlanById,
  EditActionPlanById,
  getAllActionPlan,
} from "./actionPlanServices";
import Table from "@/app/components/Table";
import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import CreateForm from "@/app/components/CreateForm";
import { getAllRisks } from "../risks/riskServices";
import { FaPlusCircle } from "react-icons/fa";
import Loading from "@/app/components/Loading";
import ErrorComponent from "@/app/components/ErrorComponent";


const Page = () => {
  const [isUserSearching, setIsUserSearching] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { openModal } = useModalStore();
  const { data: actionPlans = [], isLoading, isError} = useQuery<ActionPlan[]>({queryKey: ["action_plans"], queryFn: async () => getAllActionPlan(),
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;

  
  const filteredActionPlans = (): ActionPlan[] => {
    if (!searchQuery) return actionPlans;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return actionPlans.filter(
      (actionPlan) => 
        actionPlan.residual_risk.toLowerCase().includes(lowerCaseQuery) ||
        actionPlan.treatment.toLowerCase().includes(lowerCaseQuery) ||
        actionPlan.action_plan.toLowerCase().includes(lowerCaseQuery) ||
        actionPlan.responsible.toLowerCase().includes(lowerCaseQuery) ||
        (actionPlan.implementation_date &&
        actionPlan.implementation_date.toLowerCase().includes(lowerCaseQuery)) ||
        actionPlan.control_tracking.toLowerCase().includes(lowerCaseQuery) ||
        actionPlan.state.toLowerCase().includes(lowerCaseQuery) ||
        actionPlan.monitoring.toLowerCase().includes(lowerCaseQuery) ||
        (actionPlan.monitoring_date &&
        actionPlan.monitoring_date.toLowerCase().includes(lowerCaseQuery)) ||
        actionPlan.indicator.toLowerCase().includes(lowerCaseQuery)

    );
  };
  

  const dataToShow = !isUserSearching ? actionPlans : filteredActionPlans();
  return (
    <>
      <Nav title="PLAN DE ACCION" />
      <header className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5 bg-cPurple-100 h-64 w-[670px] p-4 py-10 rounded-xl shadow-black shadow-md ">
          <SearchBar
            setIsUserSearching={setIsUserSearching}
            setSearchQuery={setSearchQuery}
          />
          <Button
            value="Agregar plan de accion"
            onClick={openModal}
            icon={<FaPlusCircle />}
          />
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

      <Table
        data={dataToShow}
        columns={[
          "residual_risk",
          "treatment",
          "action_plan",
          "responsible",
          "implementation_date",
          "control_tracking",
          "state",
          "monitoring",
          "monitoring_date",
          "indicator",
        ]}
        columnNames={{
          ["residual_risk"]: "Riesgo residual",
          ["treatment"]: "Tratamiento",
          ["action_plan"]: "Plan de acción",
          ["responsible"]: "Responsable",
          ["implementation_date"]: "Fecha de implementación",
          ["control_tracking"]: "Rastreo de control",
          ["state"]: "Estado",
          ["monitoring"]: "Monitoreo",
          ["monitoring_date"]: "Fecha de monitoreo",
          ["indicator"]: "Indicador",
        }}
        details={"action_plans"}
        deleteFunction={DeleteActionPlanById}
        updateFunction={EditActionPlanById}
      />

      <Modal name="Planes de accion">
        <CreateForm
          module="action_plans"
          fetchFunctions={[{ key: "risk", fetchFunction: getAllRisks }]}
          createData={CreateActionPlan}
        />
      </Modal>
    </>
  );
};

export default Page;
