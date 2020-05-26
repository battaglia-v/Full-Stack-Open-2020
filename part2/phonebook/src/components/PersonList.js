import React from 'react'



const PersonList = ({ filteredPersons, deletePerson }) => {

  return (
     <>
      {filteredPersons.map(person => 
            <p key={person.name}> {person.name} {person.number}
                  <button
            onClick={() => deletePerson(person.id, person.name)}>
                   delete
                  </button>
           </p>
      )}
      </>

  )}
  




export default PersonList