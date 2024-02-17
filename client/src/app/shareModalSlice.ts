import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface shareModalSliceInterface {
  isOpen: boolean
  postId: string | undefined
}

const initialState: shareModalSliceInterface = {
  isOpen: false,
  postId: undefined,
}

export const shareModalSlice = createSlice({
  name: 'shareModal',
  initialState,
  reducers: {
    setShareModalClose: (state) => {
      state.isOpen = false
      state.postId = undefined
    },
    setShareModalOpen: (state, action: PayloadAction<shareModalSliceInterface>) => {
      state.isOpen = true
      state.postId = action.payload.postId
    },
  },
})

export const { setShareModalClose, setShareModalOpen } = shareModalSlice.actions

export default shareModalSlice.reducer
