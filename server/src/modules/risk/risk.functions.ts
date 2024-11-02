import { Prisma } from "@prisma/client";

type Range = {
  min: number;
  max: number;
  result: string;
};

type riskRanges = {
  probability: string;
  impact: string;
  result: string;
};

const Riskranges: riskRanges[] = [
  { probability: "Muy Baja", impact: "Leve", result: "Bajo" },
  { probability: "Muy Baja", impact: "Menor", result: "Bajo" },
  { probability: "Muy Baja", impact: "Moderado", result: "Moderado" },
  { probability: "Muy Baja", impact: "Mayor", result: "Alto" },
  { probability: "Muy Baja", impact: "Catastrofico", result: "Extremo" },
  { probability: "Baja", impact: "Leve", result: "Bajo" },
  { probability: "Baja", impact: "Menor", result: "Moderado" },
  { probability: "Baja", impact: "Moderado", result: "Moderado" },
  { probability: "Baja", impact: "Mayor", result: "Alto" },
  { probability: "Baja", impact: "Catastrofico", result: "Extremo" },
  { probability: "Media", impact: "Leve", result: "Moderado" },
  { probability: "Media", impact: "Menor", result: "Moderado" },
  { probability: "Media", impact: "Moderado", result: "Moderado" },
  { probability: "Media", impact: "Mayor", result: "Alto" },
  { probability: "Media", impact: "Catastrofico", result: "Extremo" },
  { probability: "Alta", impact: "Leve", result: "Moderado" },
  { probability: "Alta", impact: "Menor", result: "Moderado" },
  { probability: "Alta", impact: "Moderado", result: "Alto" },
  { probability: "Alta", impact: "Mayor", result: "Alto" },
  { probability: "Alta", impact: "Catastrofico", result: "Extremo" },
  { probability: "Muy Alta", impact: "Leve", result: "Alto" },
  { probability: "Muy Alta", impact: "Menor", result: "Alto" },
  { probability: "Muy Alta", impact: "Moderado", result: "Alto" },
  { probability: "Muy Alta", impact: "Mayor", result: "Alto" },
  { probability: "Muy Alta", impact: "Catastrofico", result: "Extremo" },
];

class RiskCalculatedAtributes {
  inherentProbability(frequency: number): string {
    const ranges: Range[] = [
      { min: 1, max: 2, result: "Muy Baja" },
      { min: 3, max: 24, result: "Baja" },
      { min: 25, max: 500, result: "Media" },
      { min: 501, max: 5000, result: "Alta" },
      { min: 5001, max: Infinity, result: "Muy Alta" },
    ];
    const foundRange = ranges.find(
      (range) => frequency >= range.min && frequency <= range.max
    );
    return foundRange ? foundRange.result : "Unknown";
  }

  probabilityPercentage(inherentProbability: string): number {
    switch (inherentProbability) {
      case "Muy Bajo":
        return 0.2;
      case "Bajo":
        return 0.4;
      case "Medio":
        return 0.6;
      case "Alto":
        return 0.8;
      case "Muy Alto":
        return 1;
      default:
        return 0;
    }
  }

  inherentImpact(penalty: number): string {
    const ranges: Range[] = [
      { min: 1, max: 10, result: "Leve" },
      { min: 11, max: 50, result: "Menor" },
      { min: 51, max: 100, result: "Moderado" },
      { min: 101, max: 500, result: "Mayor" },
      { min: 500, max: Infinity, result: "Catastrofico" },
    ];
    const foundRange = ranges.find(
      (range) => penalty >= range.min && penalty <= range.max
    );
    return foundRange ? foundRange.result : "Unknown";
  }

  impactPercentage(inherentImpact: string): number {
    switch (inherentImpact) {
      case "Leve":
        return 0.2;
      case "Menor":
        return 0.4;
      case "Moderado":
        return 0.6;
      case "Mayor":
        return 0.8;
      case "Catastrofico":
        return 1;
      default:
        return 0;
    }
  }

  inherentRisk(probability: string, impact: string): string {
    const foundRange = Riskranges.find(
      (range) => range.probability === probability && range.impact === impact
    );
    return foundRange ? foundRange.result : "Unknown";
  }

  controlCualification(controlType: string, implementation: string): number {
    const controTypeValue =
      controlType === "Preventivo"
        ? 0.25
        : controlType === "Detectivo"
        ? 0.1
        : controlType === "Correctivo"
        ? 0.15
        : 0;
    const implementationValue =
      implementation === "Manual"
        ? 0.15
        : implementation === "Automatico"
        ? 0.25
        : 0;

    return controTypeValue + implementationValue;
  }

  residualProbability(
    inherentProbability: number,
    cualification: number
  ): string {
    const result: number =
      inherentProbability * (inherentProbability - cualification);

    const ranges: Range[] = [
      { min: 0, max: 0.2, result: "Muy Baja" },
      { min: 0.21, max: 0.4, result: "Baja" },
      { min: 0.41, max: 0.6, result: "Media" },
      { min: 0.61, max: 0.8, result: "Alta" },
      { min: 0.8, max: 1, result: "Muy Alta" },
    ];

    const foundRange = ranges.find(
      (range) => result >= range.min && result <= range.max
    );
    return foundRange ? foundRange.result : "Unknown";
  }

  residualImpact(inherentImpact: number, cualification: number): string {
    const result = inherentImpact * (inherentImpact - cualification);

    const ranges: Range[] = [
      { min: 0, max: 0.2, result: "Leve" },
      { min: 0.21, max: 0.4, result: "Menor" },
      { min: 0.41, max: 0.6, result: "Moderado" },
      { min: 0.61, max: 0.8, result: "Mayor" },
      { min: 0.8, max: 1, result: "Catastrofico" },
    ];

    const foundRange = ranges.find(
      (range) => result >= range.min && result <= range.max
    );
    return foundRange ? foundRange.result : "Unknown";
  }

  finalRisk(residualProbability: string, residualImpact: string): string {
    const foundRange = Riskranges.find(
      (range) =>
        range.probability === residualProbability &&
        range.impact === residualImpact
    );
    return foundRange ? foundRange.result : "Unknown";
  }
}

export default RiskCalculatedAtributes;
