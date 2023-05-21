import { useState } from 'react'
import Message from './Message'
import { NewDiaryEntry, EntryFormProps } from '../../types';

const EntryForm = ({ onAddEntry, message, setMessage }: EntryFormProps) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  const handleAddEntry = () => {
    if (date && visibility && weather && comment) {
      const entry: NewDiaryEntry = {
        date,
        visibility,
        weather,
        comment
      }
      onAddEntry(entry)
      setDate('')
      setVisibility('')
      setWeather('')
      setComment('')
    } else {
      setMessage(`all fields are required - missing: 
        ${!date ? 'date' : ''}
        ${!visibility ? 'visibility' : ''}
        ${!weather ? 'weather' : ''}
        ${!comment ? 'comment' : ''}
      `)
      setTimeout(() => setMessage(''), 5000)
    }
  }

  return (
    <div>
      <h2>entry form</h2>
      { message && <Message message={message} />}
      date:{" "}
      <input type="date" value={date} onChange={({ target }) => {setDate(target.value)}}/><br />
      visibility:{" "}
      <select id="visibility" value={visibility} onChange={(({ target }) => setVisibility(target.value))}>
        <option>select visibility</option>
        <option value="great">great</option>
        <option value="good">good</option>
        <option value="ok">ok</option>
        <option value="poor">poor</option>
      </select><br />
      weather:{" "}
      <select id="weather" value={weather} onChange={(({ target }) => setWeather(target.value))}>
        <option>select weather</option>
        <option value="sunny">sunny</option>
        <option value="rainy">rainy</option>
        <option value="cloudy">cloudy</option>
        <option value="stormy">stormy</option>
        <option value="windy">windy</option>
      </select><br />
      comment:{" "}
      <textarea value={comment} onChange={({ target }) => setComment(target.value)}></textarea><br />
      <button onClick={handleAddEntry}>add</button>
    </div>
  )
}

export default EntryForm