import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type tabsTypes = 'search' | 'notifications'

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
    setTabOpen: (state, action: PayloadAction<tabsTypes>) => {
      state.isOpen = true
      state.type = action.payload
    },
    setTabClose: (state) => {
      state.isOpen = false
      state.type = undefined
    },
  },
})

export const { setTabOpen, setTabClose } = tabsSlice.actions

export default tabsSlice.reducer
