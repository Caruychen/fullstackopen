import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const BirthYearSetter = ({ authors }) => {
  const [name, setName] = useState('')
  const [bornString, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const submit = async (event) => {
    event.preventDefault()

    const setBornTo = parseInt(bornString)
    editAuthor({ variables: { name, setBornTo } })

    setName('')
    setBorn('')
  }

  const options = authors.map(author => ({ value: author.name, label: author.name }))

  if (!localStorage.getItem('user-token')) return null
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          defaultValue={name}
          onChange={({ value }) => setName(value)}
          options={options}
        />
        <div>
          born
          <input
            type='number'
            value={bornString}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthYearSetter