const BasicCountry = ({ name, onClick, id }) => {
  return (
      <div>{name}
        <button onClick={onClick} id={id}>show facts</button>
      </div>
  )
}

export default BasicCountry
