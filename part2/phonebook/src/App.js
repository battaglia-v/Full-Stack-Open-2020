import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Persons from './components/PersonList'
import Filter from './components/Filter'
import personsService from './services/persons'
import Notification from './components/Notification'



const App = () => {

 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [activeFilter, setActiveFilter] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    personsService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])




  const filterToShow = activeFilter
    ? persons
    : persons.filter(person => {
      return person.name.toLowerCase().includes(newFilter.toLowerCase())
    })


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

    

  const deletePersonOf = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) { 
     
      setPersons(persons.filter(person => person.id !== id))
      personsService
      .deletePerson(id)
      .then(() => {
        setErrorMessage(
          `Deleted ${name}`
        )
            setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
    } )
  }
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setActiveFilter(false)
    console.log(newFilter)
  }

  const addName = (event) => {
    event.preventDefault()

      const personObject = {
        name: newName,
        number: newNumber
      }
   

     const duplicateName = persons.filter(person => person.name === newName) 

     if (duplicateName.length !== 0 ) {
       window.alert( `${newName} is already added to phonebook, replace the old number with a new one?`)

      
       // Making a copy of the 'duplicateName array' as we cannot access the duplicateName (here we are in curly braces)
       const personToModify = persons.find(person => person.name === newName)

       const modifiedPerson = {...personToModify, number: newNumber}
     
       return (

        personsService
          .update(modifiedPerson.id, modifiedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== modifiedPerson.id ? person : returnedPerson))
            setErrorMessage(
              `Updated ${modifiedPerson.name}`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
            setNewName('')
            setNewNumber('')

          })
          .catch(error => {
            setErrorMessage(
              `Error - ${modifiedPerson.name} has already been removed from the server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          }
          )
       )}
        

     return (

  // add new name + number (person object) to the database // 
  personsService
    .create(personObject)
    .then(dataBaseResponse => {
      setPersons(persons.concat(dataBaseResponse))
      setNewName('')
      setNewNumber('')
      setErrorMessage(
        `Added ${personObject.name}'`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    })
    
     )
  }



 
  
  
      

  return (
    <div>
     <h2>Phonebook</h2>
     <Notification message={errorMessage}/>

     <Filter handleFilterChange={handleFilterChange} />

     <h3>add a new</h3>

     <Form newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addName={addName}/>

     <h2>Numbers</h2>
    <Persons filteredPersons={filterToShow} deletePerson={deletePersonOf} />


    </div>
  )
}

  export default App
