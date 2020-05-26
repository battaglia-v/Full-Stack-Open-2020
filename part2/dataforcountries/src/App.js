import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Display from './components/Display'
import Countries from './components/Countries'


const App = () => {

  
  const [countryData, setCountryData] = useState([])
  const [inputSearch, setInputSearch] = useState('')
  const [showCountries, setShowCountries] = useState(true)


  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled');
      console.log(response.data);
      setCountryData(response.data);
    })
  }, [])

  



  const handleInputSearch = (e) => {
    setInputSearch(e.target.value)
    setShowCountries(false)
    
  }
  


  const handleClick = (e) => {
    setInputSearch(e.target.parentElement.firstChild.data)
  }
    
  const filteredCountries = showCountries
    ? 0
    : countryData.filter( country => {
      return country.name.toLowerCase().includes(inputSearch.toLowerCase())
    })
          

  return ( 
    
    <div className="App">
      <>find countries</>
       <Display filterHandler={handleInputSearch}/>
       <Countries
          countriesList={filteredCountries}
          handleClick={handleClick}
          inputCountry={inputSearch}
          />
    </div> 
  )
}

export default App
