import React, { useState, useEffect } from "react";
import axios from "axios";



const SingleCountryData = ( {country } ) => {

    const [weatherData, setWeatherData] = useState([])


    
    useEffect(() => {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
        )
        .then((response) => {
          console.log(response.data.current);
          setWeatherData(response.data.current);
        });
    }, [country.capital])


    return (
      <div key={country.name}>
        <h1>
          <strong>{country.name}</strong>
        </h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <>
          {country.currencies.map((currencies) => (
            <>
              <p key={currencies.name}>
                currency: {currencies.name} {currencies.symbol}
              </p>
            </>
          ))}
        </>
        <h3>
          <strong>Spoken languages</strong>
        </h3>
        <>
          {country.languages.map((language) => (
            <div>
              <p key={language.nativeName}>{language.nativeName}</p>
              <p key={language.name}>(English) {language.name}</p>
            </div>
          ))}
        </>
        <img alt="country-flag" src={country.flag} width="400" />

        <h3>
          <strong>Weather in {country.capital}</strong>
        </h3>
        <p>
          <strong>temperature: {weatherData.temperature} Celcius</strong>
        </p>
        <img alt="weather-icon" src={weatherData.weather_icons} />
        <p>
          <strong>wind: {weatherData.wind_speed} mph direction {weatherData.wind_dir}</strong>
        </p>
      </div>
    );
    }
    export default SingleCountryData