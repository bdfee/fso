import { useState } from 'react'
import BasicCountry from './basic-country'
import FullCountry from './full-country'

const Results = ({ queryResults, onClick }) => {

  const numberOfCountries = queryResults.length
  if (!numberOfCountries) {
    return <div key='no-results'>no results</div>
  } else {
    return (
      <div>
        {queryResults.map(({
            name,
            capital,
            area,
            languages,
            latlng,
            flag,
            display
            }, index) => {
              if (display === true || numberOfCountries === 1) {
                return (
                  <FullCountry
                    name={name}
                    key={name}
                    id={index}
                    capital={capital}
                    area={area}
                    languages={languages}
                    latlng={latlng}
                    flag={flag}
                  />
                )
              } else {
                  return (
                    <BasicCountry
                      name={name}
                      key={name}
                      id={name}
                      onClick={onClick}
                    />
                  )
              }
        })}
      </div>
    )
  }



}

export default Results
