import './DataList.css';
import Data from './Data';
import { useEffect, useState } from 'react';

function DataList() {
  const [weatherData, setWeatherData] = useState(null);
  const [icon, setIcon] = useState('');
  const [city, setCity] = useState('mumbai'); // Default city
  const [inputCity, setInputCity] = useState(''); // User input city
  const [error, setError] = useState('');

  useEffect(() => {
    if (city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a3755f339456822fa2e74606cf459d45`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
          if (data.cod === 200) {
            setWeatherData(data);
            setError('');
          } else {
            setError('City not found');
          }
        })
        .catch(err => {
          console.log(err);
          setError('Error fetching data');
        });
    }
  }, [city]);

  useEffect(() => {
    if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
      setIcon(`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`);
    }
  }, [weatherData]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(inputCity);
  };

  if (!weatherData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="weather-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {!error && (
        <Data
          temp={weatherData.main?.temp}
          cityname={weatherData.name}
          humidity={weatherData.main?.humidity}
          windSpeed={weatherData.wind?.speed}
          icon={icon}
        />
      )}
    </div>
  );
}

export default DataList;
