import { put, takeLatest } from "@redux-saga/core/effects"
import { getAllUsers } from "../../../apolloClient/queries/user"
import {ICreateUserPayload, IUsers} from "../../interfaces";
import { getAllUsersData } from "../../slices/users";

function* getUsersWatcher() {
  yield takeLatest('GET_ALL_USERS_FOR_CHECKING', getUsersWorker)
}

function* getUsersWorker(payload: ICreateUserPayload) {
  const {payload: {setAttantion, setinfoAttention}} = payload
  try {
    const users: IUsers = yield getAllUsers();
    yield put(getAllUsersData(users.getAllUsersForChecking));
    yield setinfoAttention('');
    yield setAttantion(false)
  } catch (err: any) {
    setinfoAttention(err.message);
    setAttantion(true)
  }
}

export default getUsersWatcher