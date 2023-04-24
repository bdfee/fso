import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (e) => {
    e.preventDefault()
    const getId = () => (100000 * Math.random()).toFixed(0)
    const newAnecdote = {
      content: e.target.anecdote.value,
      id: getId(),
      votes: 0
    }
    e.target.anecdote.value = ''
    props.createAnecdote(newAnecdote)
    props.setNotification(`you added '${newAnecdote.content}'`, 10)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm


