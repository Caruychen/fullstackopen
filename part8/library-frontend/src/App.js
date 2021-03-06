import React, { useEffect, useState } from 'react'
import Authors from './views/Authors'
import Books from './views/Books'
import NewBook from './views/NewBook'
import LoginForm from './views/LoginForm'
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'
import { BOOK_ADDED, ME } from './queries'
import Recommended from './views/Recommended'
import useUpdateCache from './hooks/useUpdateCache'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [getMe, { data: user }] = useLazyQuery(ME)
  const client = useApolloClient()
  const updateCache = useUpdateCache()

  useEffect(() => {
    const loggedUserToken = localStorage.getItem('user-token')
    if (loggedUserToken) {
      setToken(loggedUserToken)
      getMe()
    }
  }, [getMe])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      updateCache(subscriptionData.data.bookAdded)
      window.alert(`New book '${subscriptionData.data.bookAdded.title}' added`)
    }
  })

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
      />

      <NewBook
        show={page === 'add'}
      />

      {user && user.me && <Recommended
        show={page === 'recommend'}
        favoriteGenre={user.me.favoriteGenre}
      />}

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        getUser={getMe}
      />

    </div>
  )
}

export default App