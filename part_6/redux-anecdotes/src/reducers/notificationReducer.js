import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    display: 'none',
    timeoutId: ''
  },
  reducers: {
    setNotificationTo(state, action) {
      state.message = action.payload
      state.display = 'block'
    },
    clearNotification(state, action) {
      state.message = ''
      state.display = 'none'
    },
    setTimeoutId(state, action) {
      state.timeoutId = action.payload
    },
  }
})

export const { setNotificationTo, clearNotification, setTimeoutId } = notificationSlice.actions

export const setNotification = (content, duration) => {
  return (dispatch, getState) => {
    clearTimeout(getState().notification.timeoutId)
    dispatch(setNotificationTo(content))
    const newTimeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)
    dispatch(setTimeoutId(newTimeoutId))
  }
}

export default notificationSlice.reducer