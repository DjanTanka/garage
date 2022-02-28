import { put, takeLatest } from 'redux-saga/effects';
import { activateUser } from '../../../apolloClient/mutations/auth';
import IUser, { IActivateUserPayload } from '../../interfaces';
import { addUserToState } from '../../slices/user';

function* activateUserWatcher() {
  yield takeLatest('ACTIVATE_USER', activateUserWorker)
}

function* activateUserWorker(payload: IActivateUserPayload) {
  const { payload: { email, verifyCode, setinfoAttention, setAttention } } = payload
  try {
    const activatedUser: IUser = yield activateUser({
      userActivateInput: {
        email,
        actNum: verifyCode
      }
    })
    yield put(addUserToState(activatedUser))
  } catch (err: any) {
    setinfoAttention(err.message);
    setAttention(true)
  }
}

export default activateUserWatcher
