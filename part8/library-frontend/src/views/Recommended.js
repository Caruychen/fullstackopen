import React from 'react'
import BooksTable from '../components/BooksTable'

const Recommended = ({ show, bookData, favoriteGenre }) => {
  if (!show) {
    return null
  }

  const filteredBooks = bookData.allBooks.filter(book => favoriteGenre ? book.genres.includes(favoriteGenre) : true)
  return (
    <BooksTable header="recommendations" books={filteredBooks}>
      <p>books in your favorite genre <b>{favoriteGenre ? favoriteGenre : "all genres"}</b></p>
    </BooksTable>
  )
}

export default Recommended