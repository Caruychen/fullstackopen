import React from 'react'

const Filter = ({ books, setFilter }) => {
  const genres = [...new Set(books.flatMap(book => book.genres))]

  return (
    <div>
      {genres.map(genre => <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>)}
      <button onClick={() => setFilter(null)}>all genres</button>
    </div>
  )
}

export default Filter