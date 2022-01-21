import { put, takeLatest } from 'redux-saga/effects';
import { logOutUser } from '../../slices/user';

function* logOutUserWatcher() {
  yield takeLatest('LOGOUT_USER', logOutUserWorker)
}

function* logOutUserWorker(payload:any) {
  const { history } = payload.payload
  yield put(logOutUser())  
  yield history.push('/')
  localStorage.removeItem('usersTokenAGarage')
  localStorage.removeItem('usersTokenRGarage')
}

export default logOutUserWatcher