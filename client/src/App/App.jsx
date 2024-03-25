import { useRef, useState } from "react";
import "./App.css";
import Searchside from "./Searchside/Searchside.jsx";
import Weather from "./Weather/Weather.jsx";

function App() {
  const [weatherData, setWeatherData] = useState();
  const targetRef = useRef(null);
  
  return (
    <div id="app-main-div">
      <div id="app-searchside-div">
        <Searchside setWeatherData={setWeatherData} targetRef={targetRef} weatherData={weatherData} />
      </div>
      <div id="app-weather-div">
        <Weather targetRef={targetRef} weatherData={weatherData} />
      </div>
    </div>
  );
}

export default App;
