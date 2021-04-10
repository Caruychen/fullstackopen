import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Filter from './Filter'
import Book from './Book'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(null)

  if (!props.show) {
    return null
  }

  const books = result.data.allBooks
  const filteredBooks = books.filter(book => filter ? book.genres.includes(filter) : true)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(book =>
            <Book key={book.title} book={book} />
          )}
        </tbody>
      </table>
      <Filter books={books} setFilter={setFilter} />
    </div>
  )
}

export default Books