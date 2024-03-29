import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type tabsTypes = 'search' | 'notifications' | 'createPost'

interface tabsSliceInterface {
  isOpen: boolean
  type: tabsTypes | undefined
}

const initialState: tabsSliceInterface = {
  isOpen: false,
  type: undefined,
}

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setTabClose: (state) => {
      state.isOpen = false
      state.type = undefined
    },
    setTabToggle: (state, action: PayloadAction<tabsTypes>) => {
      if (action.payload === state.type) {
        state.isOpen = false
        state.type = undefined
      } else {
        state.isOpen = true
        state.type = action.payload
      }
    },
  },
})

export const { setTabClose, setTabToggle } = tabsSlice.actions

export default tabsSlice.reducer
