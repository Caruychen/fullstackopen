import React, { useEffect, useState } from 'react'
import Filter from '../components/Filter'
import BooksTable from '../components/BooksTable'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null)
  const [books, setBooks] = useState(null)
  const [getAllBooks, { loading, data }] = useLazyQuery(ALL_BOOKS)
  
  useEffect(() => {
    getAllBooks({ variables: { genre } })
  }, [getAllBooks, genre])

  useEffect(() => {
    !loading && setBooks(data ? data.allBooks : null)
  }, [loading, data])

  if (!show) {
    return null
  }

  return (
    <div>
      <BooksTable header="books" books={books}>
        <p>in genre <b>{genre ? genre : "all genres"}</b></p>
      </BooksTable>
      <Filter setFilter={setGenre} />
    </div>
  )
}

export default Books