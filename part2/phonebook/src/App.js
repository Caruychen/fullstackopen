import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if (!existingPerson) {
      personService
        .create({ name: newName, number: newNumber })
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    else {
      updatePerson(existingPerson)
    }
    setNewName('')
    setNewNumber('')
  }

  const updatePerson = (person) => {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const changedPerson = { ...person, number: newNumber }
      personService
        .update(changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
        })
    }
  }

  const deletePerson = (targetPerson) => () => {
    if (window.confirm(`Delete ${targetPerson.name}?`)) {
      personService
        .destroy(targetPerson.id)
        .catch(error => {
          alert(`${targetPerson.name} was already deleted from server.`)
        })
      setPersons(persons.filter(person => person.id !== targetPerson.id))
    }
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
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App