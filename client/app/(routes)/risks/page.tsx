"use client";
import { useQuery } from "@tanstack/react-query";
import { createRisk, getAllRisks } from "./riskServices";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import CreateForm from "@/app/components/CreateForm";
import { Risk } from "@/app/interfaces/riskInterface";
import { getAllRiskTypes } from "../risk_type/riskTypeServices";
import { getAllThreats } from "../threats/threatServices";
import { getAllAssetTypes } from "../asset-types/assetTypeServices";
import { getAllVulnerabilities } from "../vulnerability/vulnerabilityServices";
import useModalStore from "@/app/store/modalStore";
import Table from "@/app/components/Table";
import Loading from "@/app/components/Loading";
import Error from "@/app/components/Error";
import { LuPlus } from "react-icons/lu";

const RisksPage = () => {
  const { openModal } = useModalStore();

  const {
    data: risks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["risk"],
    queryFn: async () => getAllRisks(),
  });

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-8 mt-8">
        <Button
          value="Agregar Riesgo"
          onClick={openModal}
          icon={<LuPlus size={"1.5rem"} />}
        />
        <h2 className="font-semibold text-xl">
          Aqui tienes toda la información acerca de tus riesgos
        </h2>
      </div>

      <div className=" flex justify-center">
        <Table
          data={risks}
          columns={[
            "frequency",
            "penalty",
            "inherent_probability",
            "inherent_impact",
            "inherent_risk",
            "control_type",
            "implementation",
            "control_qualification",
            "residual_probability",
            "residual_impact",
            "final_risk",
          ]}
          columnNames={{
            ["frequency"]: "Frecuencia",
            ["penalty"]: "Penalización",
            ["inherent_probability"]: "Probabilidad Inherente",
            ["inherent_impact"]: "Impacto Inherente",
            ["inherent_risk"]: "Riesgo Inherente",
            ["control_type"]: "Tipo de Control",
            ["implementation"]: "Implementación",
            ["control_qualification"]: "Calificación de Control",
            ["residual_probability"]: "Probabilidad Residual",
            ["residual_impact"]: "Impacto Residual",
            ["final_risk"]: "Riesgo Final",
          }}
          details={"risks"}
        />
      </div>
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
