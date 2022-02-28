import { put, takeLatest } from 'redux-saga/effects';
import { loginUser } from '../../../apolloClient/queries/login';
import { ICreateUserPayload, ITokens } from '../../interfaces';
import { addUserToState } from '../../slices/user';

function* loginUserWatcher() {
  yield takeLatest('LOGIN_USER', loginUserWorker)
}

function* loginUserWorker(payload: ICreateUserPayload) {
  const { payload: {history, setinfoAttention, setAttention, ...userLoginInput} } = payload
  try {
    const tokens: ITokens = yield loginUser({
     userLoginInput
    })
    console.log('---tokens', tokens)
    yield localStorage.setItem('usersTokenAGarage', tokens.login.tokenA)
    yield localStorage.setItem('usersTokenRGarage', tokens.login.tokenR)
    yield put(addUserToState(tokens.login.user))  
    const url = `/user/${tokens.login.user._id}`
  yield history.push(url)

  } catch(err: any) {
    setinfoAttention(err.message);
    setAttention(true)
  }
}

export default loginUserWatcher