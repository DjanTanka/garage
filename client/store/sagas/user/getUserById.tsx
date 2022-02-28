import { put, takeLatest } from 'redux-saga/effects';
import { getUserById } from '../../../apolloClient/queries/user';
import { cars } from '../../../apolloClient/queries/cars'
import { ICar, IgetUserByIDPayload, IUserById } from '../../interfaces';
import { addUserToState, userLoading } from '../../slices/user';
import { addCarsOfUser } from '../../slices/cars';

function* getUserByWatcher() {
  yield takeLatest('GET_USER_AND_CARS_BY_ID', getUserByIdWorker)
}

function* getUserByIdWorker(payload: IgetUserByIDPayload) {
  const { payload: {id, isUserActivated} } = payload
  const userByID: IUserById = yield getUserById(id);
  yield put(userLoading())
  yield put(addUserToState(userByID.getUserById));

  if(isUserActivated) {
    const carsOfUserById: ICar[] = yield cars(id);
    console.log('---carsOfUserById', carsOfUserById)
    yield put(addCarsOfUser(carsOfUserById))
  }
};

export default getUserByWatcher