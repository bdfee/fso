import { connect } from 'react-redux'
import { setFilterOf } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = (e) => {
    props.setFilterOf(e.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  setFilterOf
}

const ConnectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter