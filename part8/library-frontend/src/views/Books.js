import React, { useState } from 'react'
import Filter from '../components/Filter'
import BooksTable from '../components/BooksTable'

const Books = ({ show, bookData }) => {
  const [filter, setFilter] = useState(null)

  if (!show) {
    return null
  }

  const filteredBooks = bookData.allBooks.filter(book => filter ? book.genres.includes(filter) : true)

  return (
    <div>
      <BooksTable header="books" books={filteredBooks}>
        <p>in genre <b>{filter ? filter : "all genres"}</b></p>
      </BooksTable>
      <Filter books={bookData.allBooks} setFilter={setFilter} />
    </div>
  )
}

export default Books