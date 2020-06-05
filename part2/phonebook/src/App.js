import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Persons from './components/PersonList'
import Filter from './components/Filter'
import Notification from './components/Notification'

import personsService from './services/persons'




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
      number: newNumber,
    }

     const duplicateName = persons.filter(person => person.name === newName) 

     if (duplicateName.length !== 0 ) {

       const personToModify = duplicateName[0]
       const confirmation = window.confirm(
       `${newName} is already added to phonebook, replace the old number with a new one?`)

       

      if (confirmation) {
       // Making a copy of the 'duplicateName array' as we cannot access the duplicateName (here we are in curly braces)
        

        personsService
          .update(personToModify)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id === returnedPerson.id 
            ? returnedPerson 
            : person
            ))
            setErrorMessage(
              `Updated ${personToModify.name}`
            )
          })
          .catch(error => {
            setPersons(
              persons.filter(person => 
                person.id !== personToModify.id
              )
            )
            setErrorMessage(
              `Error - ${personToModify.name} has already been removed from the server`
            )
      })
    }

  } else {

     
  // add new name + number (person object) to the database // 
  personsService
    .create(personObject)
    .then(returnPerson => {
      setPersons(persons.concat(returnPerson))
      setErrorMessage(
        `Added ${newName} `
      )
    })
    .catch(error => {
      console.log(error.response.data)
      setErrorMessage(error.response.data)
    })

  }

    setNewName('')
    setNewNumber('')
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const filterToShow = activeFilter
    ? persons
    : persons.filter(person => {
      return person.name.toLowerCase().includes(newFilter.toLowerCase())
    })

      

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
