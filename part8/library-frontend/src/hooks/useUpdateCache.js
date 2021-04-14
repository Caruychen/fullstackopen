import { useApolloClient } from '@apollo/client'
import { ALL_BOOKS, BOOK_DETAILS } from '../queries'

const useUpdateCache = () => {
  const client = useApolloClient()
  const cache = client.cache
  const includedIn = (cachedData = [], newBook) => {
    return cachedData.map(book => book.id).includes(newBook.id)
  }
  const updateCache = (newBook) => {
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, newBook)) {
      cache.modify({
        fields: {
          allBooks(existingBooks = []) {
            const newBookRef = cache.writeFragment({
              data: newBook,
              fragment: BOOK_DETAILS
            })
            return [...existingBooks, newBookRef]
          }
        }
      })
    }
  }
  return updateCache
}

export default useUpdateCache