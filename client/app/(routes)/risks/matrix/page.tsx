"use client";
import Loading from "@/app/components/Loading";
import Error from "@/app/components/ErrorComponent";
import { useRisks } from "../riskServices";
import { Risk } from "@/app/interfaces/riskInterface";
import Button from "@/app/components/Button";
import Link from "next/link";

const RiskMatrixCanvas: React.FC = () => {
  const { data: risks, isLoading, isError } = useRisks();

  const filteredAndSortedRisks = risks
    ?.filter(
      (risk: Risk) =>
        risk.inherent_risk === "Extremo" || risk.inherent_risk === "Alto"
    )
    .sort((a: Risk, b: Risk) => {
      if (a.inherent_risk === "Extremo" && b.inherent_risk === "Alto")
        return -1;
      if (a.inherent_risk === "Alto" && b.inherent_risk === "Extremo") return 1;
      return 0;
    });

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  console.log(filteredAndSortedRisks);

  return (
    <div className="flex flex-col items-center justify-center gap-y-8">
      <h3>Aqui están los riesgos más criticos que tienes</h3>
      <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filteredAndSortedRisks?.map((risk: Risk) => (
          <div
            key={risk.id}
            className={`card border-4 shadow-xl ${
              risk.inherent_risk === "Alto"
                ? "border-orange-400 shadow-orange-400/50"
                : "border-rose-600 shadow-rose-600/50"
            } w-96  bg-cPurple-300 `}
          >
            <div className="card-body">
              <h2 className="card-title">Riesgo {risk.inherent_risk}</h2>
              <p>Probabilidad de que ocurra: {risk.inherent_probability}</p>
              <p>Impacto en caso de ocurrir: {risk.inherent_impact}</p>
              <p>Activos afectados: {risk.asset_type.name}</p>
              <p>Vulnerabilidad detectada: {risk.vulnerability.name}</p>
              <p>Posible Amenaza: {risk.threat.name}</p>
              <div className="flex flex-col p-2 gap-y-4 items-center justify-center">
                <Link href={`/risks/${risk.id}`}>
                  <Button
                    value="Mas info"
                    color="bg-cPurple-100"
                    textColor="text-cPurple-600"
                    hover="hover:bg-cPurple-200"
                  />
                </Link>
                <Link href={`/action-plan?risk=${risk.id}`}>
                  <Button value="Crear plan de accion" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskMatrixCanvas;
