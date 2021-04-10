import React from 'react'
import Book from './Book'

const BooksTable = ({ header, books, filter }) => {
  return (
    <div>
      <h2>{header}</h2>
      <p>in genre <b>{filter ? filter : "all genres"}</b></p>
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
          {books.map(book =>
            <Book key={book.title} book={book} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default BooksTable