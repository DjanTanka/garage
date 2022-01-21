import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICounter {
  count: number;
}

const initialState: ICounter = {
  count: 1
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
     state.count = state.count+1
    },
    decrement: (state) => {
      state.count = state.count-1
    },
    clearCount: (state) => {
      state.count = 0
    }
  },
})

export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer