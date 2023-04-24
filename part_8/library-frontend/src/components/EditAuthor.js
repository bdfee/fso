import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS } from '../gql/queries'
import { UPDATE_AUTHOR } from '../gql/mutations'

const EditAuthor = ({ allAuthors }) => {
  const [name, setName] = useState(allAuthors[0].name)
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const handleSubmit = async (event) => {
    event.preventDefault()

    await updateAuthor({ variables: { name, setBornTo: +born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>set birthyear</h3>
      <select onChange={({ target }) => setName(target.value)}>
        {allAuthors.map((a) => (
          <option key={a.name} value={a.name}>
            {a.name}
          </option>
        ))}
      </select>
      <div>
        born
        <input
          type="text"
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
      </div>
      <button onClick={handleSubmit}>update author</button>
    </div>
  )
}

export default EditAuthor
