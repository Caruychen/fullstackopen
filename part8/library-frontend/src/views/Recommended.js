import { useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import BooksTable from '../components/BooksTable'
import { ALL_BOOKS } from '../queries'

const Recommended = ({ show, favoriteGenre }) => {
  const [getAllBooks, { data }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    getAllBooks({ variables: { genre: favoriteGenre } })
  }, [getAllBooks, favoriteGenre])

  if (!show) {
    return null
  }
  
  return (
    <BooksTable header="recommendations" books={data.allBooks}>
      <p>books in your favorite genre <b>{favoriteGenre ? favoriteGenre : "all genres"}</b></p>
    </BooksTable>
  )
}

export default Recommended