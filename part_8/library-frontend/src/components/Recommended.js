import { useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from '../gql/queries'

const Recommended = () => {
  const currentUser = useQuery(CURRENT_USER)
  const favoriteGenre = currentUser.data?.me?.favoriteGenre || ''

  const books = useQuery(
    ALL_BOOKS,
    favoriteGenre
      ? {
          variables: { genre: favoriteGenre },
          refetchQueries: [{ query: ALL_BOOKS }]
        }
      : undefined
  )

  if (currentUser.loading || books.loading) {
    return (
      <>
        <h2>recommended</h2>
        <div>Loading...</div>
      </>
    )
  }

  return (
    <div>
      <h2>recommended</h2>
      <div>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
