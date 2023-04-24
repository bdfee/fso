import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../gql/queries'

const Books = () => {
  const [filter, setFilter] = useState('')

  const { loading, data } = useQuery(
    ALL_BOOKS,
    filter
      ? {
          variables: { genre: filter },
          refetchQueries: [{ query: ALL_BOOKS }]
        }
      : undefined
  )

  if (loading) {
    return (
      <>
        <h2>books</h2>
        <div>loading...</div>
      </>
    )
  }

  return (
    <div>
      <h2>books</h2>
      {filter && (
        <div>
          in genre <strong>{filter}</strong>
        </div>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map(({ title, author, published }) => (
            <tr key={title}>
              <td>{title}</td>
              <td>{author.name}</td>
              <td>{published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!loading &&
        [...new Set(data.allBooks.flatMap((book) => book.genres))].map(
          (genre) => {
            return (
              <button
                key={genre}
                onClick={() => {
                  setFilter(filter === genre ? '' : genre)
                }}
                style={
                  filter === genre
                    ? { background: 'black', color: 'white' }
                    : null
                }>
                {genre}
              </button>
            )
          }
        )}
    </div>
  )
}

export default Books
