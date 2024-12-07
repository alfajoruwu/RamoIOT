import React, { useState, useEffect } from "react";
import Navbar from "../Elementos comunes/Navbar/Navbar";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./Mapa.css";

export const Mapa = () => {
  const [heatData, setHeatData] = useState({});
  const [heatRadius, setHeatRadius] = useState(20);

  const simularAPI = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { edificio: "EdificioMinas", temperatura: 30 },
          { edificio: "CTA", temperatura: 25 },
          { edificio: "Facultad", temperatura: 28 },
          { edificio: "ServiciosMultiples", temperatura: 32 },
          { edificio: "Universia", temperatura: 22 },
          { edificio: "IplusD", temperatura: 18 },
          { edificio: "Gimnasio", temperatura: 35 },
          { edificio: "AulasE", temperatura:40},
        ]);
      }, 1000); // Simula un retraso de 1 segundo
    });
  };

  const estacionesOrdenadas = Object.entries(heatData).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  const getHeatColor = (value) => {
    if (value < 20) return "rgba(0, 0, 255, 0.8)";
    if (value < 30) return "rgba(0, 255, 0, 0.8)";
    if (value < 40) return "rgba(255, 165, 0, 0.8)";
    return "rgba(255, 0, 0, 0.8)";
  };

  const getHeatRadius = (value) => {
    const baseRadius = Math.min(Math.max(value * 2, 50), 200);
    return baseRadius * (heatRadius / 20);
  };

  const getBaseColor = (value) => {
    if (value < 20) return "blue";
    if (value < 30) return "green";
    if (value < 40) return "orange";
    return "red";
  };

  const getDynamicGradient = (value, baseColor) => {
    switch (baseColor) {
      case "red":
        return `radial-gradient(circle, rgba(255, 0, 0, 0.8) 0%, rgba(255, 165, 0, 0.8) 50%, rgba(255, 255, 0, 0.8) 100%)`;
      case "orange":
        return `radial-gradient(circle, rgba(255, 165, 0, 0.8) 0%, rgba(255, 255, 0, 0.8) 50%, rgba(0, 255, 0, 0.8) 100%)`;
      case "yellow":
        return `radial-gradient(circle, rgba(255, 255, 0, 0.8) 0%, rgba(0, 255, 0, 0.8) 100%)`;
      case "green":
        return `radial-gradient(circle, rgba(0, 255, 0, 0.8) 0%, rgba(0, 0, 255, 0) 100%)`;
      case "blue":
        return `radial-gradient(circle, rgba(0, 0, 255, 0.8) 0%, rgba(0, 0, 255, 0) 100%)`;
      default:
        return `radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)`;
    }
  };

  const handleClick = (nombre) => {
    alert(`Hiciste clic en ${nombre}`);
  };

  useEffect(() => {
    // Simular llamada a API
    simularAPI().then((data) => {
      const newHeatData = {};
      data.forEach(({ edificio, temperatura }) => {
        newHeatData[edificio] = temperatura;
      });
      setHeatData(newHeatData);
    });
  }, []);

  return (
    <>
      <Navbar titulo={"Mapa de Calor"} />
      <div className="barra-superior">
        {estacionesOrdenadas.map(([nombre, temperatura]) => (
          <div key={nombre} className="estacion">
            {nombre}: <span className="temperatura">{temperatura}°C</span>
          </div>
        ))}
      </div>

      <div className="mapa-container">
        <TransformWrapper>
          <TransformComponent>
            <div style={{ position: "relative" }}>
              <img
                src="./src/images/MapaUtalca.png"
                alt="Mapa"
                className="mapa-image"
              />
              {Object.entries(heatData).map(([key, value]) => (
                <div
                  key={key}
                  id={key}
                  className="marcador"
                  style={{
                    backgroundColor: getHeatColor(value),
                  }}
                  onClick={() => handleClick(key)}
                  title={`${key} - Calor: ${value}`}
                >
                  <div
                    className="calor-radio"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: `${getHeatRadius(value)}px`,
                      height: `${getHeatRadius(value)}px`,
                      borderRadius: "50%",
                      background: getDynamicGradient(
                        value,
                        getBaseColor(value)
                      ),
                      opacity: 1,
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>

      <div className="slider-container">
        <label htmlFor="heatRadius">
          Radio de Calor: {Math.round((heatRadius / 20) * 100)}%
        </label>
        <input
          id="heatRadius"
          type="range"
          min="10"
          max="50"
          value={heatRadius}
          onChange={(e) => setHeatRadius(Number(e.target.value))}
        />
      </div>
    </>
  );
};
