import React, { useEffect, useRef, useState } from 'react';
import search from '../assets/search.png';
import clear from '../assets/clear.png';
import humidity from '../assets/humidity.png';
import wind from '../assets/wind.png';
import cloud from '../assets/cloud.png';
import drizzle from '../assets/drizzle.png';
import snow from '../assets/snow.png';
import rain from '../assets/rain.png';

const Weather = () => {
  const [wdata, setWData] = useState(null);
  const [error, setError] = useState(false);
  // const [img, setImage] = useState();
  const inputRef = useRef();

  const add = () => {
    const input = inputRef.current.value.trim();
    if (input) {
      fetchWeather(input);
    }
  };

  const allicon={
    "01d":clear,
    "01n":clear,
    "02d":cloud,
    "02n":cloud,
    "03d":cloud,
    "03n":cloud,
    "04d":drizzle,
    "04n":drizzle,
    "05d":rain,
    "05n":rain,
    "06d":rain,
    "06n":rain,
    "07d":snow,
    "07n":snow,

  };

  const fetchWeather = async (input) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=17010ae1bb72400fcdc63dae1f212e43&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) { //data.cod is a status code ANd 200 means successful request
        const icon= allicon[data.weather[0].icon] || clear;

        setWData({
          city: data.name,
          humidity: data.main.humidity,
          temp: Math.floor(data.main.temp),
          wind: data.wind.speed,
          icon: icon
          
        }); 
        console.log(data);
      } else {
        setError(true);
        setWData(null);
      }
    } catch (e) {
      console.error("Error fetching weather:", e);
      setError(true);
    }
  };

  return (
    <div className='bg-black place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl text-white'>
      <div className='text-3xl flex justify-center'>
        <h1>Weather App</h1>
      </div>

      {/* Search Input */}
      <div className='flex p-4 mt-4 gap-3 bg-gray-300 rounded-full'>
        <input ref={inputRef} className='border-none bg-transparent outline-none text-black px-2 ' onKeyDown={(e) => e.key === "Enter" && add()}  type="text" placeholder="Enter city..." />
        <img src={search} alt="Search"  onClick={add}  className="cursor-pointer pl-30" />
      </div>

      {/* Display Weather Data */}
      {error ? (
        <p className="text-center text-red-500 mt-4">City not found!</p>
        
      ) : wdata ? (
        <>
          <div className='place-self-center text-white mt-4'>
            <img className='w-45 place-self-center' src={wdata.icon} alt="Weather Icon" />
            <p className='place-self-center text-4xl'>{wdata.temp}°C</p>
            <p className='place-self-center text-2xl'>{wdata.city}</p>
          </div>

          <div className='flex justify-center items-center pt-4'>
            <div className='flex p-4'>
              <img className='w-7' src={humidity} alt="Humidity" />
              <div className='flex flex-col pl-2'>
                <p>{wdata.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className='flex p-4'>
              <img className='w-7' src={wind} alt="Wind Speed" />
              <div className='flex flex-col pl-2'>
                <p>{wdata.wind} Km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-400 mt-4">Enter a city to get weather data</p>
      )}
    </div>
  );
};

export default Weather;
