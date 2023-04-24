import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdote)
  
  const vote = ({ id, content, votes }) => {
    const anecdote = {
      content,
      id,
      votes: votes + 1
    }
    dispatch(addVote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }

  // filter
  const { filterStr } = useSelector(state => state.filter)
  const filteredList = anecdotes.filter(anecdote => 
    anecdote.content.includes(filterStr)
  )
  // sort
  const sortDesc = [...filteredList].sort((a, b) => 
    a.votes > b.votes ? -1 : 1
  )

  return (
    <>
      <h2>Anecdotes</h2>
      {sortDesc.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList

