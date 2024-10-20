"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getRiskById } from "../riskServices";

const page = ({ params }: { params: { id: string } }) => {


  const { data } = useQuery({
    queryKey: ["risks", params.id],
    queryFn: async () => getRiskById(params.id),
  });
  return (
    <div >
      Aqui se ve la informacion detallada del riesgo con el id {params.id}
      <h1>Frecuencia {data?.frequency}</h1>
      <p>Zona de riesgo final {data?.final_risk}</p>
    </div>
  );
};

export default page;
