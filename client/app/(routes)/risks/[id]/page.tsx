"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getRiskById } from "../riskServices";
import Loading from "@/app/components/Loading";
import Error from "@/app/components/Error";
import {
  FaClipboardList,
  FaExclamationTriangle,
  FaInfoCircle,
  FaShieldAlt,
} from "react-icons/fa";

const page = ({ params }: { params: { id: string } }) => {
  const {
    data: risk,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["risk", params.id],
    queryFn: async () => getRiskById(params.id),
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  console.log(risk);
  return (
    risk && (
      <div className=" p-8 flex flex-col items-center text-cPurple-950">
        <div className="bg-cPurple-50 p-8 rounded-3xl shadow-xl shadow-cPurple-300 w-full max-w-5xl transition transform hover:scale-105 duration-300">
          <h1 className="text-4xl font-extrabold text-cPurple-800 mb-8 border-b-4 border-cPurple-500 inline-block pb-2">
            Detalles del Riesgo
          </h1>
          {/* Sección de Información General */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-cPurple-700 flex items-center gap-2 mb-6">
              <FaInfoCircle className="text-cPurple-600" />
              Información General
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-cPurple-900">
              <p>
                <span className="font-semibold">Tipo de Riesgo:</span>{" "}
                {risk.risk_type.name}
              </p>
              <p>
                <span className="font-semibold">Frecuencia:</span>{" "}
                {risk.frequency}
              </p>
              <p>
                <span className="font-semibold">Penalización:</span>{" "}
                {risk.penalty}
              </p>
            </div>
          </div>

          {/* Sección de Evaluación de Riesgo */}
          <div className="mb-8 bg-cPurple-100 p-6 rounded-lg shadow-inner transition hover:shadow-cPurple-400 duration-300">
            <h2 className="text-2xl font-semibold text-cPurple-700 flex items-center gap-2 mb-4">
              <FaExclamationTriangle className="text-cPurple-600" />
              Evaluación de Riesgo
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p>
                <span className="font-semibold">Probabilidad Inherente:</span>{" "}
                {risk.inherent_probability}
              </p>
              <p>
                <span className="font-semibold">Impacto Inherente:</span>{" "}
                {risk.inherent_impact}
              </p>
              <p>
                <span className="font-semibold">Riesgo Inherente:</span>{" "}
                {risk.inherent_risk}
              </p>
              <p>
                <span className="font-semibold">Probabilidad Residual:</span>{" "}
                {risk.residual_probability}
              </p>
              <p>
                <span className="font-semibold">Impacto Residual:</span>{" "}
                {risk.residual_impact}
              </p>
              <p>
                <span className="font-semibold">Riesgo Final:</span>{" "}
                {risk.final_risk}
              </p>
            </div>
          </div>

          {/* Sección de Control */}
          <div className="mb-8 bg-cPurple-50 p-6 rounded-lg shadow-inner border-l-4 border-cPurple-600 transition hover:shadow-lg hover:shadow-cPurple-300 duration-300">
            <h2 className="text-2xl font-semibold text-cPurple-700 flex items-center gap-2 mb-4">
              <FaShieldAlt className="text-cPurple-600" />
              Control y Clasificación
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p>
                <span className="font-semibold">Tipo de Control:</span>{" "}
                {risk.control_type}
              </p>
              <p>
                <span className="font-semibold">Implementación:</span>{" "}
                {risk.implementation}
              </p>
              <p>
                <span className="font-semibold">Calificación del Control:</span>{" "}
                {risk.control_qualification}
              </p>
            </div>
          </div>

          {/* Sección de Activos y Vulnerabilidad */}
          <div className="bg-cPurple-200 p-6 rounded-lg shadow-lg shadow-cPurple-500 transition transform hover:scale-105 duration-300">
            <h2 className="text-2xl font-semibold text-cPurple-700 flex items-center gap-2 mb-4">
              <FaClipboardList className="text-cPurple-600" />
              Activos y Vulnerabilidades
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p>
                <span className="font-semibold">Activo:</span>{" "}
                {risk.asset_type.name}
              </p>
              <p>
                <span className="font-semibold">Descripción del Activo:</span>{" "}
                {risk.asset_type.description}
              </p>
              <p>
                <span className="font-semibold">Vulnerabilidad:</span>{" "}
                {risk.vulnerability.name}
              </p>
              <p>
                <span className="font-semibold">
                  Descripción de la Vulnerabilidad:
                </span>{" "}
                {risk.vulnerability.description}
              </p>
              <p>
                <span className="font-semibold">Amenaza:</span>{" "}
                {risk.threat.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default page;
