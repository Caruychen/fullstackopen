import axios from 'axios'
import React, { useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    persons.some(person => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(
      search.toLowerCase()
    )
  )

  const personsFormProps = {
    addPerson,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm {...personsFormProps} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App