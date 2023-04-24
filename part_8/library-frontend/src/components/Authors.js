import EditAuthor from './EditAuthor'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../gql/queries'

const Authors = ({ token }) => {
  const { loading, data } = useQuery(ALL_AUTHORS)

  if (loading) {
    return (
      <>
        <h2>authors</h2>
        <div>loading...</div>
      </>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && <EditAuthor allAuthors={data.allAuthors} />}
    </div>
  )
}

export default Authors
