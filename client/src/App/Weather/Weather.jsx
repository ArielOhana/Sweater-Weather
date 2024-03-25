import './Weather.css';
import NoResultsImage from '../../images/NoResults.png';
function Weather(props) {
    const {targetRef, weatherData } = props;
    
    if(!weatherData)
    {
        return (<div className='weather-main-div'  ref={targetRef}> <img src={NoResultsImage} alt="No Results" /></div>)
    }
    return (
      <div className='weather-main-div'>
        <div className='weather-top-container' ref={targetRef}>
            <h2 className='weather-city-text'>{weatherData.city}</h2>
            <h3 className='weather-country-text'>{weatherData.country}</h3>
            <h3 className='weather-lastupdate-text'>{weatherData.lastupdate}</h3>
        </div>
        <div className='weather-currenttemp-div'>
            <h1 className='weather-currenttemp'>{weatherData.tempnow}°</h1>
            <h3 className='weather-status'>{weatherData.description}</h3>
        </div>
        <div className='weather-description-div'>
            <div className='weather-description-container'>
                <h4 className='weather-description-type'>Precipitation</h4>
                <h5 className='weather-description-info'>{weatherData.precipitation} mm</h5>
            </div>
            <div className='weather-description-container'>
                <h4  className='weather-description-type'>Humidity</h4>
                <h5 className='weather-description-info'>{weatherData.humidity}%</h5>
            </div>
            <div className='weather-description-container'>
                <h4  className='weather-description-type'>Wind</h4>
                <h5 className='weather-description-info'>{weatherData.windspeed} km/h</h5>
            </div>
        </div>
        <div className='weather-forecast-div'>
        {
            weatherData.forecast?.map((element,index) =>(
                <div className='weather-description-container' key={index}>
                <h4  className='weather-forecast-time'>{element.hour}</h4>
                <h5 className='weather-forecast-temp'>{element.temp}°</h5>
            </div>
            ))
        }
      
        </div>
      </div>
    )
  }
  
export default Weather
  