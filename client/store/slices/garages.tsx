import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGarage } from '../interfaces';

const initialState: IGarage[] = []

export const garagesSlice = createSlice({
  name: 'garages',
  initialState,
  reducers: {
    addGarages: (state, action: PayloadAction<IGarage>) => {
     state.push(action.payload)
    }
  },
})

export const { addGarages } = garagesSlice.actions

export default garagesSlice.reducer