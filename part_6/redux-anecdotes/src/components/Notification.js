import { connect } from 'react-redux'

const Notification = (props) => {
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: props.display
  }

  return (
    <div style={style}>
      {props.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    display: state.notification.display
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification