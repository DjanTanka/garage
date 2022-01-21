import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICar } from '../interfaces';
import { RootState } from './rootReducer';

const initialState: ICar[] = []

export const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addCarToState: (state, action: PayloadAction<ICar>) => {
      return [...state, action.payload]
    },
    addCarsOfUser: (_, action: PayloadAction<ICar[]>) => {
      return [...action.payload]
    }
  }
})
export const selectCarsOfUsers = (state: RootState) => state.cars
export const { addCarToState, addCarsOfUser } = carSlice.actions

export default carSlice.reducer