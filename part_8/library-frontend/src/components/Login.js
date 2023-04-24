import { useState, useEffect } from 'react'
import { useApolloClient, useMutation } from '@apollo/client'
import { LOGIN } from '../gql/mutations'

const Login = ({ setToken, token }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const client = useApolloClient()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.error(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const handleLogin = async (event) => {
    event.preventDefault()
    await login({ variables: { username, password } })
  }

  const handleLogout = () => {
    localStorage.clear()
    setToken(null)
    client.resetStore()
  }

  if (token) {
    return (
      <>
        <div>you are currently logged in</div>
        <button onClick={handleLogout}>logout</button>
      </>
    )
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>login</h2>
      <div>
        username{' '}
        <input
          type="text"
          value={username}
          onChange={({ target }) => {
            setUsername(target.value)
          }}
        />
      </div>
      <div>
        password{' '}
        <input
          type="password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value)
          }}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login
