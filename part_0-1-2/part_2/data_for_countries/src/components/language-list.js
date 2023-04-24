const LanguageList = ({ languages }) => {
  return (
    <>
    <h3>languages:</h3>
      <ul>
        {Object.values(languages).map(language => {
            return <li key={language}>{language}</li>
          })
        }
      </ul>
    </>
  )
}

export default LanguageList
