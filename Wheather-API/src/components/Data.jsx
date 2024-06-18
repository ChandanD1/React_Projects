import './Data.css';

function Data({ temp, cityname, humidity, windSpeed, icon }) {
  return (
    <div className='Interface'>
      <div className='city'>City: {cityname || 'N/A'}</div>
      <div className='temp'>Today's Temperature: {temp ? `${Math.round(temp - 273.15)}°C` : 'N/A'}</div>
      {icon && <img className='weather-icon' src={icon} alt="weather icon" />}
      <div className='humidity'>Humidity: {humidity ? `${humidity}%` : 'N/A'}</div>
      <div className='wind-spd'>Wind Speed: {windSpeed ? `${windSpeed} m/s` : 'N/A'}</div>
    </div>
  );
}

export default Data;
