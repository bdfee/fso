import { useState, useEffect } from 'react'
import { DiaryEntry, NewDiaryEntry } from '../types'
import { getEntries, createEntry } from './services/diaryService';
import axios from 'axios'

import Entries from './components/Entries';
import EntryForm from './components/EntryForm'

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [message, setMessage] = useState('')

  const addEntry = async (entry: NewDiaryEntry) => {
  try {
    const response = await createEntry(entry);
    if (axios.isAxiosError(response)) {
      setMessage(response?.response?.data);
    } else {
      setEntries((entries) => entries.concat(response));
      setMessage("");
    }
  } catch (error) {
    console.error(error);
    setMessage("An unknown error occurred");
  }
};

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await getEntries()
        if(axios.isAxiosError(data)) {
          setMessage('An error occured: ' + data?.message)
        } else {
          setEntries(data)
        }
      } catch (error) {
        console.error(error)
        setMessage("An unknown error occured")
      }
    }

    fetchEntries()
  }, [])
 
  return (
    <div className="App">
      <EntryForm onAddEntry={addEntry} message={message} setMessage={setMessage}/>
      <Entries diaryEntries={entries}/>
    </div>
  );
}

export default App
