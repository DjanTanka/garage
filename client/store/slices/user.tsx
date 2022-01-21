import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IUser, { IUserSlice } from '../interfaces';
import { RootState } from './rootReducer';

const initUserData = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: '',
  balance: 0,
  isActivated: true,
  actNum: '',
  verifyCodeSent: false
}

const initialState: IUserSlice = {
  userData: initUserData,
  status: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserToState: (state, action: PayloadAction<IUser>) => {
      state.status = 'success';
      state.userData = { ...state.userData, ...action.payload}
    },
    verifyCodeSentSuccess: (state) => {
      state.userData.verifyCodeSent = true
    },
    updateActivateStatus: (state, action: PayloadAction<boolean>) => {
      state.userData.isActivated = action.payload
    },
    logOutUser: () => {
      return initialState
    },
    userLoading: (state) => {
      state.status = 'loading...'
    }
  },
})

export const selectUser = (state: RootState) => state.user
export const { addUserToState, verifyCodeSentSuccess, updateActivateStatus, logOutUser, userLoading} = userSlice.actions

export default userSlice.reducer