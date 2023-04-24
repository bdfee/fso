import { useState, useEffect } from 'react'
import axios from 'axios'
import { kmToMiles } from './utils'

import Form from './components/form'
import Results from './components/results'

function App() {

  const [countries, setCountries] = useState([])
  const [input, setInput] = useState('')
  const [queryResults, setQueryResults] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(({ data }) => {
      setCountries(data.sort((a, b) =>
        a.name.official.localeCompare(b.name.official)
      ))
    })
  }, [])

  const handleQuery = e => {
    setInput(e.target.value)

    const newQueryResults = []
    countries.filter(({ name }) =>
        name.official.toLowerCase().includes(e.target.value.toLowerCase()))
          .forEach(({ name, capital, area, languages, flags, latlng }) => {
            const result = {
              name: name.official,
              capital: capital,
              area: kmToMiles(area),
              languages: languages,
              flag: flags.png,
              latlng: latlng,
              display: false
            }

            newQueryResults.push(result)
          })

        setQueryResults(newQueryResults)
    }

  const handleDisplay = e => {
    const updateDisplay = []
      queryResults.map(entry => {
        if (entry.name === e.target.id) {
          entry.display = true
        }
        updateDisplay.push(entry)
      })

    setQueryResults(updateDisplay)
  }

  return (
    <>
      <Form value={input} onChange={handleQuery}/>
        {(Object.values(queryResults).length <= 10)
            ? <Results queryResults={queryResults} onClick={handleDisplay}/>
            : <>Too many matches, specify another filter</>
        }
    </>
  );
}

export default App;
