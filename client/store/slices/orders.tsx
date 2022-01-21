import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface IOrder {
  id: string | number;
  userId: string | number;
  carId: string | number;
  garageId: string | number;
  title: string;
  discription?: string;
  priority: string;
  status?: string;
  dateAdd: string;
  dateStart: string;
  dateEnd: string;
}

const initialState: IOrder[] = []
 
export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<IOrder>) => {
     state.push(action.payload)
    }
  }
})

export const { addOrder } = orderSlice.actions

export default orderSlice.reducer