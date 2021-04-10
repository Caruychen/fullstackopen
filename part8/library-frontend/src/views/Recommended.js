import React from 'react'
import BooksTable from '../components/BooksTable'

const Recommended = ({ show, bookData, favoriteGenre }) => {
  if (!show) {
    return null
  }

  const filteredBooks = bookData.allBooks.filter(book => favoriteGenre ? book.genres.includes(favoriteGenre) : true)
  return (
    <BooksTable header="recommendations" books={filteredBooks} filter={favoriteGenre} />
  )
}

export default Recommended