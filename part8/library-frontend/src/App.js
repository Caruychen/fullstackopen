import React, { useEffect, useState } from 'react'
import Authors from './views/Authors'
import Books from './views/Books'
import NewBook from './views/NewBook'
import LoginForm from './views/LoginForm'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from './queries'
import Recommended from './views/Recommended'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const { data: bookData } = useQuery(ALL_BOOKS)
  const { data: user, refetch } = useQuery(ME)
  const client = useApolloClient()

  useEffect(() => {
    const loggedUserToken = localStorage.getItem('user-token')
    if (loggedUserToken) {
      setToken(loggedUserToken)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token
            ? <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommended</button>
              <button onClick={logout}>logout</button>
            </>
            : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
        bookData={bookData}
      />

      <NewBook
        show={page === 'add'}
      />

      {user && user.me && <Recommended
        show={page === 'recommend'}
        bookData={bookData}
        favoriteGenre={user.me.favoriteGenre}
      />}

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        refetch={refetch}
      />

    </div>
  )
}

export default App