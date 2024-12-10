import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Elementos comunes/Navbar/Navbar";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./Mapa.css";
import api from "../../Utils/Axios/AxiosInstance";

export const Mapa = () => {
  const { id } = useParams();
  const [estaciones, setEstaciones] = useState([]);
  const [heatData, setHeatData] = useState({});
  const [heatRadius, setHeatRadius] = useState(20);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchEstaciones = async () => {
      try {
        const response = await api.get(`/EstacionesPorUsuario/${id}`);
  
        const estacionesMarcadores = {
          "Estacion UT123": "EdificioMinas",  
          "Estacion RM456": "CTA",                 
        };
  
        
        const marcadoresValidos = [
          "EdificioMinas",
          "CTA",
          "Facultad",
          "ServiciosMultiples",
          "Universia",
          "IplusD",
          "Gimnasio",
          "Casino",
          "Construccion",
          "Laboratorios",
          "Mecanica",
          "AulasE",
        ];
  
       
        const estacionesFiltradas = response.data
          .map((estacion) => {
            
            const marcador = estacionesMarcadores[estacion.Nombre];
            
            if (marcador && marcadoresValidos.includes(marcador)) {
              return { ...estacion, NombreMarcador: marcador }; 
            }
            return null; 
          })
          .filter(Boolean); 
        //console.log(estacionesFiltradas);
        setEstaciones(estacionesFiltradas); 
      } catch (err) {
        console.error("Error al obtener estaciones:", err);
        setError("No se pudieron cargar las estaciones.");
      }
    };
  
    fetchEstaciones();
  }, [id]);
  
  
  useEffect(() => {
    const fetchSensoresYTemperaturas = async () => {
      try {
        const heatDataTemp = {};
        for (const estacion of estaciones) {
          
          const temperaturaAleatoria = Math.floor(Math.random() * (40 - 15 + 1)) + 15;
  
          heatDataTemp[estacion.NombreMarcador] = {
            temperatura: temperaturaAleatoria,  
            marcador: estacion.NombreMarcador,  
          };
        }
        //console.log(heatDataTemp);
        setHeatData(heatDataTemp);
      } catch (err) {
        console.error("Error al obtener sensores y temperaturas:", err);
        setError("No se pudieron cargar las temperaturas.");
      }
    };
  
    if (estaciones.length > 0) {
      fetchSensoresYTemperaturas();
    }
  }, [estaciones]);
  

  const getHeatColor = (value) => {
    //console.log(value);
    if (value < 20) return "rgba(0, 0, 255, 0.8)";
    if (value < 30) return "rgba(0, 255, 0, 0.8)";
    if (value < 40) return "rgba(255, 165, 0, 0.8)";
    return "rgba(255, 0, 0, 0.8)";
  };

  const getHeatRadius = (value) => {
    //console.log(value)
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

  return (
    <>
      <Navbar titulo="Mapa de Estaciones" />
      <div className="barra-superior">
        {error ? (
          <p className="error">{error}</p>
        ) : (
          estaciones.map((estacion) => (
            <div key={estacion.id} className="estacion">
              {estacion.NombreMarcador} {/* Mostrar el nombre del marcador */}
            </div>
          ))
        )}
      </div>

      <div className="mapa-container">
        <TransformWrapper>
          <TransformComponent>
            <div style={{ position: "relative" }}>
              <img
                src="../src/images/MapaUtalca.png"
                alt="Mapa"
                className="mapa-image"
              />
              {Object.entries(heatData).map(([nombre, { temperatura }]) => (
                <div
                  key={nombre}
                  id={nombre}
                  className="marcador"
                  style={{
                    backgroundColor: getHeatColor(temperatura), 
                  }}
                  title={`${nombre} - Calor: ${temperatura}°C`}
                >
                  <div
                    className="calor-radio"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: `${getHeatRadius(temperatura)}px`,
                      height: `${getHeatRadius(temperatura)}px`,
                      borderRadius: "50%",
                      background: getDynamicGradient(
                        temperatura,
                        getBaseColor(temperatura)
                      ),
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
