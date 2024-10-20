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

const RisksPage = () => {
  const [showModal, setShowModal] = useState(false);

  const { data: risks } = useQuery({
    queryKey: ["risks"],
    queryFn: async () => getAllRisks(),
  });
  return (
    <>
      <div className="">
        {risks?.map((risk: Risk) => (
          <div key={risk.id}>
            <h2>{risk.id}</h2>
            <h2>{risk.frequency}</h2>
            <h2>{risk.penalty}</h2>
          </div>
        ))}
        <Button value="Agregar Riesgo" onClick={() => setShowModal(true)} />
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)} name="Riesgo">
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
