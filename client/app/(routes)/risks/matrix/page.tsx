"use client"
import React, { useRef, useEffect } from 'react';
import { useRisks } from '../riskServices';

type Risk = {
  id: number;
  inherent_probability: string;
  inherent_impact: string;
  residual_probability: string;
  residual_impact: string;
  inherent_risk: string;
  final_risk: string;
};

const RiskMatrixCanvas: React.FC = () => {
  const { data: risks, isLoading, isError } = useRisks();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Función para convertir niveles a índices de posición
  const levelToIndex = (level: string): number => {
    switch (level) {
      case 'Muy Baja': return 1;
      case 'Baja': return 2;
      case 'Medio': return 3;
      case 'Alta': return 4;
      case 'Muy Alta': return 5;
      default: return 0; // Asegúrate de que hay un manejo para niveles desconocidos
    }
  };

  // Función para obtener color del riesgo
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Alto': return 'red';
      case 'Moderado': return 'orange';
      case 'Bajo': return 'green';
      default: return 'gray';
    }
  };

  useEffect(() => {
    if (isLoading || isError || !risks) return;

    console.log(risks); // Log para verificar los datos recibidos

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuraciones del lienzo
    const gridSize = 100; // Tamaño de la cuadrícula
    const matrixSize = 5; // Tamaño de la matriz
    canvas.width = gridSize * matrixSize;
    canvas.height = gridSize * matrixSize;

    // Dibujar la cuadrícula de fondo
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ccc';

    for (let i = 0; i <= matrixSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * gridSize, 0);
      ctx.lineTo(i * gridSize, canvas.height);
      ctx.moveTo(0, i * gridSize);
      ctx.lineTo(canvas.width, i * gridSize);
      ctx.stroke();
    }

    // Dibujar los puntos de riesgo
    risks.forEach((risk: Risk) => {
      const inherentX = levelToIndex(risk.inherent_probability) * gridSize - gridSize / 2;
      const inherentY = canvas.height - levelToIndex(risk.inherent_impact) * gridSize + gridSize / 2;
      const residualX = levelToIndex(risk.residual_probability) * gridSize - gridSize / 2;
      const residualY = canvas.height - levelToIndex(risk.residual_impact) * gridSize + gridSize / 2;

      console.log(`Inherent Point: (${inherentX}, ${inherentY})`); // Log de posición inherente
      console.log(`Residual Point: (${residualX}, ${residualY})`); // Log de posición residual

      // Punto para riesgo inherente
      ctx.fillStyle = getRiskColor(risk.inherent_risk);
      ctx.beginPath();
      ctx.arc(inherentX, inherentY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Punto para riesgo residual
      ctx.fillStyle = getRiskColor(risk.final_risk);
      ctx.beginPath();
      ctx.arc(residualX, residualY, 8, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [risks, isLoading, isError]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Matriz de Riesgos (Canvas)</h2>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading data</p>}
      <canvas ref={canvasRef} className="border border-gray-400" />
    </div>
  );
};

export default RiskMatrixCanvas;
