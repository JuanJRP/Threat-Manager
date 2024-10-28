"use client";
import { useQuery } from "@tanstack/react-query";
import { createRisk, getAllRisks } from "./riskServices";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { useState } from "react";
import CreateForm from "@/app/components/CreateForm";
import { Risk } from "@/app/interfaces/riskInterface";
import { getAllRiskTypes } from "../risk_type/riskTypeServices";
import { createThreat, getAllThreats } from "../threats/threatServices";
import { getAllAssetTypes } from "../asset-types/assetTypeServices";
import { getAllVulnerabilities } from "../vulnerability/vulnerabilityServices";
import useModalStore from "@/app/store/modalStore";
import Table from "@/app/components/Table";

const RisksPage = () => {
  const { openModal } = useModalStore();

  const { data: risks, isLoading } = useQuery({
    queryKey: ["risks"],
    queryFn: async () => getAllRisks(),
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div className=" flex justify-center">
        <Table
          data={risks}
          columns={["frequency", "penalty"]}
          details={"risks"}
        />
      </div>
      <Button value="Agregar Riesgo" onClick={openModal} />
      <Modal name="Riesgos">
        <CreateForm
          module="risks"
          fetchFunctions={[
            { key: "riskTypes", fetchFunction: getAllRiskTypes },
            { key: "threats", fetchFunction: getAllThreats },
            { key: "assetTypes", fetchFunction: getAllAssetTypes },
            { key: "vulnerabilities", fetchFunction: getAllVulnerabilities },
          ]}
          createData={createRisk}
        />
      </Modal>
    </>
  );
};

export default RisksPage;
