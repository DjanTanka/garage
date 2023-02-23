import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCar, TCars } from '../../src/interfaces'
import { RootState } from './rootReducer';

const initialState: TCars =  {status: 'empty', cars: []}

export const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addCarToState: (state, action: PayloadAction<TCar[]>) => {
      return {...state, cars: action.payload}
    },
    isCarsLoading: () => {
      return {status: 'loading...', cars: []}
    },
    addCarsOfUser: (_, action: PayloadAction<TCar[]>) => {
      return {status: 'success', cars: action.payload }
    }
}})
export const selectCarsOfUser = (state: RootState) => state.cars
export const { addCarToState, isCarsLoading, addCarsOfUser } = carSlice.actions

export default carSlice.reducer