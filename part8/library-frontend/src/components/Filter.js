import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Filter = ({ setFilter }) => {
  const { loading, data } = useQuery(ALL_BOOKS)
  const [genres, setGenres] = useState([])
  
  useEffect(() => {
    !loading && setGenres([...new Set(data.allBooks.flatMap(book => book.genres))])
  }, [loading, data])

  return (
    <div>
      {genres.map(genre => <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>)}
      <button onClick={() => setFilter(null)}>all genres</button>
    </div>
  )
}

export default Filter