import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filterStr: ''
  },
  reducers: {
    setFilterOf(state, action) {
      state.filterStr = action.payload
    },
  }
})

export const { setFilterOf } = filterSlice.actions
export default filterSlice.reducer