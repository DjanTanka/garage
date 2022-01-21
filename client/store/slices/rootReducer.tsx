import { combineReducers } from '@reduxjs/toolkit';
import { allUsersSlice } from './users';
import { carSlice } from './cars';
import { garagesSlice } from './garages';
import { orderSlice } from './orders';
import { userSlice } from './user';
export interface IAppState {
  user: string;
}

const rootReducer = combineReducers({
  user: userSlice.reducer,
  users: allUsersSlice.reducer,
  garages: garagesSlice.reducer,
  cars: carSlice.reducer,
  orders: orderSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>; 

export default rootReducer;