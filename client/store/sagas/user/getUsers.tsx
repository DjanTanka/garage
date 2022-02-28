import { put, takeLatest } from "@redux-saga/core/effects"
import { getAllUsers } from "../../../apolloClient/queries/user"
import {ICreateUserPayload, IUsers} from "../../interfaces";
import { getAllUsersData } from "../../slices/users";

function* getUsersWatcher() {
  yield takeLatest('GET_ALL_USERS_FOR_CHECKING', getUsersWorker)
}

function* getUsersWorker(payload: ICreateUserPayload) {
  const {payload: {setAttention, setinfoAttention}} = payload
  try {
    const users: IUsers = yield getAllUsers();
    yield put(getAllUsersData(users.getAllUsersForChecking));
    yield setinfoAttention('');
    yield setAttention(false)
  } catch (err: any) {
    setinfoAttention(err.message);
    setAttention(true)
  }
}

export default getUsersWatcher