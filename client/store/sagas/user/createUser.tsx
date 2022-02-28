import { put, takeLatest } from 'redux-saga/effects';
import { createUser} from '../../../apolloClient/mutations/auth';
import IUser, { ICreateUserPayload } from '../../interfaces';
import { addUserToState } from '../../slices/user';

function* createUserWatcher() {
  yield takeLatest('CREATE_USER', createUserWorker)
}

function* createUserWorker(payload: ICreateUserPayload) {
  const { payload: {history, setinfoAttention, setAttention, ...userInput} } = payload
  try {
    const user: IUser = yield createUser({
    userInput
  })
  yield put(addUserToState(user))  
  const url = `/user/${user._id}`
  yield history.push(url)
  } catch (err: any) {
    setinfoAttention(err.message);
    setAttention(true)
  }
}

export default createUserWatcher