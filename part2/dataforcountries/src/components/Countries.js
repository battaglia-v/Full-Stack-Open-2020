import React from 'react'
import SingleCountryData from './SingleCountryData'


const Countries = ({ countriesList, inputCountry, handleClick} ) => {


    if ( countriesList.length > 10 && inputCountry.length >= 1 ) {
            return <p>Too many matches, please specify another filter</p>;
        } else {
        if ( countriesList.length === 1) {
                return (
                   
                    countriesList.map(country =>
                        <SingleCountryData
                            key={countriesList.name}
                            country={country}
                        />
                    )
                )
            } else {
                return (
                  <>
                      {!countriesList
                        ? []
                        : countriesList.map((country) => (
                            <div key={country.name}>
                              <p>
                                {country.name}
                                <button onClick={handleClick}>Show</button>
                              </p>
                            </div>
                          ))}
                  </>
                );
            }
        }
    }


        


export default Countries