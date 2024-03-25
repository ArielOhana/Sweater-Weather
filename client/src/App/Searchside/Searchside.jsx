import axios from "axios";
import { useRef, useState } from "react";
import Logo from "../../images/FintekLogo.png";
import "./Searchside.css";

function Searchside(props) {
  const { setWeatherData, weatherData,targetRef } = props;
  const [helperText, setHelperText] = useState("")
  const inputRef = useRef(null);
  const handleClick = async () => {
    try
    {
    const city = inputRef.current.value;
    const { data: weatherData } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/weather/${city}`
    );
    setWeatherData(weatherData);
    setHelperText("")
    window.scrollTo({
      top: targetRef.current.offsetTop,
      behavior: 'smooth'
    });
  }
  catch(error)
  {
    console.error(error);
    setWeatherData(null);
    setHelperText("Something went wrong, please try again");
  }
  };

  return (
    <div className="searchside-main-div">
      <img className="searchside-logo" src={Logo} alt="Fintek logo" />

      <div className="searchside-searchdiv">
        <h1 className="searchside-main-text">
          Use our weather app to see the weather around the world
        </h1>
        <h5 className="searchside-seachbar-text">City name</h5>

        <div className="searchbar-inner-div">
          <input type="text" className="searchside-seachbar" ref={inputRef} />
          <button className="searchbar-button" onClick={handleClick}>
            <span>Check</span>
          </button>
        </div>
        <h6 className="searchbar-helper-text">{helperText}</h6>
      </div>

      <div className="searchside-bottom-div">
        <h5 className="searchside-bottom-text">
          {weatherData ? `latitude ${weatherData?.lat}   longitude ${weatherData?.lon}` :""}
        </h5>
        <h5 className="searchside-bottom-text">
          {weatherData ? `accurate to ${weatherData?.currenttime}`:""}
        </h5>
      </div>
    </div>
  );
}

export default Searchside;
