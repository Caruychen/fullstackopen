
import React from 'react'
import BirthYearSetter from './BirthYearSetter'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

const Author = ({ author }) => {
  return (
    <tr>
      <td>{author.name}</td>
      <td>{author.born}</td>
      <td>{author.bookCount}</td>
    </tr>
  )
}

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <Author key={a.name} author={a}/>
          )}
        </tbody>
      </table>
      <BirthYearSetter />
    </div>
  )
}

export default Authors
