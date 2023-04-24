import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'

import { useSubscription, useApolloClient } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './gql/queries'

const updateCache = (cache, query, addedBook) => {
  const uniqueByTitle = (array) => {
    let seen = new Set()
    return array.filter((item) => {
      let key = item.title
      return seen.has(key) ? false : seen.add(key)
    })
  }

  cache.updateQuery(query, (data) => {
    // only execute if data is present in cache
    return {
      allBooks: uniqueByTitle(data.allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const client = useApolloClient()
  const [token, setToken] = useState(
    localStorage.getItem('library-user-token')
  )
  const linkStyle = { margin: '0 10px' }
  const forbidden = <div>must be logged in to access</div>

  console.log(client.cache)

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`${addedBook.title} added!`)
      // only manually update if data is already in cache
      const existingData = client.cache.readQuery({ query: ALL_BOOKS })
      if (existingData) {
        updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      }
    }
  })

  return (
    <Router>
      <div>
        <Link style={linkStyle} to="/">
          home
        </Link>
        <Link style={linkStyle} to="/authors">
          authors
        </Link>
        <Link style={linkStyle} to="/books">
          books
        </Link>
        {token && (
          <>
            <Link style={linkStyle} to="/add-book">
              add books
            </Link>
            <Link style={linkStyle} to="/recommended">
              recommended
            </Link>
          </>
        )}
        <Link style={linkStyle} to="/login">
          {!token ? 'login' : 'logout'}
        </Link>
      </div>
      <Routes>
        <Route path="/authors" element={<Authors token={token} />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route
          path="/add-book"
          element={token ? <NewBook /> : forbidden}></Route>
        <Route
          path="/recommended"
          element={token ? <Recommended /> : forbidden}></Route>
        <Route
          path="/login"
          element={<Login setToken={setToken} token={token} />}></Route>
        <Route
          path="/"
          element={
            <>
              <h2>home</h2>
              <h3>select from nav</h3>
            </>
          }></Route>
      </Routes>
    </Router>
  )
}

export default App
