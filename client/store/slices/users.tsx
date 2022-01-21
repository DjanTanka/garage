import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IUser from '../interfaces';

const initialState: IUser[] = [];

export const allUsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getAllUsersData: (state, action: PayloadAction<IUser[]>) => {
      
      state.length = 0;
      state.push(...action.payload)
    },
  },
})

export const { getAllUsersData } = allUsersSlice.actions

export default allUsersSlice.reducer