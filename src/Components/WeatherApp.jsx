import React, { useState } from "react";
import "./WeatherApp.css";
import clear_icon from "./Assets/clear.png";
import cloud_icon from "./Assets/cloud.png";
import drizzle_icon from "./Assets/drizzle.png";
import rain_icon from "./Assets/rain.png";
import snow_icon from "./Assets/snow.png";
import search_icon from "./Assets/search.png";
import humidity_icon from "./Assets/humidity.png";
import wind_icon from "./Assets/wind.png";

const WeatherApp = () => {
  const [cityInput, setCityInput] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [temperature, setTemperature] = useState("");
  const [location, setLocation] = useState("");
  const [wicon, setWicon] = useState(cloud_icon); // Inicializa com cloud_icon

  const search = async () => {
    if (cityInput === "") {
      return 0;
    }

    try {
      let url_api = `https://api.weatherapi.com/v1/current.json?key=a6dc7ca431d24864a69170615241003&q=${cityInput}&aqi=no`;

      let response = await fetch(url_api);
      let data = await response.json();

      setHumidity(data.current.humidity);
      setWindSpeed(data.current.wind_mph);
      setTemperature(data.current.temp_c + "°C");
      setLocation(data.location.name);

      // Lógica para definir o ícone com base na condição do tempo
      switch (data.current.condition.text.toLowerCase()) {
        case "partly cloudy":
          setWicon(cloud_icon);
          break;
        case "drizzle":
          setWicon(drizzle_icon);
          break;
        case "rain":
          setWicon(rain_icon);
          break;
        case "Blowing snow":
          setWicon(snow_icon);
          break;
        default:
          setWicon(clear_icon);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do clima:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="topBar">
          <input
            type="text"
            className="cityInput"
            placeholder="Pesquisar"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
          />
          <div className="searchIcon" onClick={search}>
            <img src={search_icon} alt="Ícone de Pesquisa" />
          </div>
        </div>

        <div className="temp">
          <img src={wicon} alt="Ícone do Tempo" />
          <div className="weather-temp">{temperature}</div>
          <div className="weather-location">{location}</div>
        </div>

        <div className="data-container">
          <div className="weatherStatus">
            <img src={humidity_icon} alt="Umidade" />
            <div className="data">
              <div className="humidity-percent">{humidity}%</div>
              <div className="text">Umidade</div>
            </div>
          </div>
          <div className="weatherStatus">
            <img src={wind_icon} alt="Vento" />
            <div className="data">
              <div className="wind-rate">{windSpeed} km/h</div>
              <div className="text">
                Velocidade do <br /> Vento
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
