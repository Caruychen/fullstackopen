import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)

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
          handleMessage(`${newName} added`, 'success')
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
          handleMessage(`${newName} updated`, 'success')
        })
        .catch(error => {
          if (error.response.status === 404) {
            handleMessage(`Information of ${newName} has already been removed from server`, 'error')
          }
        })
    }
  }

  const deletePerson = (targetPerson) => () => {
    if (window.confirm(`Delete ${targetPerson.name}?`)) {
      personService
        .destroy(targetPerson.id)
        .then(response => {
          handleMessage(`${targetPerson.name} deleted from server.`, 'success')
        })
        .catch(error => {
          if (error.response.status === 404) {
            handleMessage(`${targetPerson.name} was already deleted from server.`, 'error')
          }
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

  const handleMessage = (text, status) => {
    setMessage({ text, status })
    setTimeout(() => {
      setMessage(null)
    }, 5000);
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
      <Notification message={message} />
      <Filter handleSearchChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm {...personsFormProps} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App