import { put, takeLatest } from 'redux-saga/effects';
import { deleteCar } from '../../../apolloClient/mutations/car';
import { ICar } from '../../interfaces';
import { addCarsOfUser } from '../../slices/cars' 

function* deleteCarWatcher() {
  yield takeLatest('DELETE_CAR', deleteCarWorker)
}

function* deleteCarWorker(payload: any) {
  const { payload: carId } = payload
  try {
    const cars: ICar[] = yield deleteCar({
      id: carId.carId
  })
  yield put(addCarsOfUser(cars))  
  } catch (err: any) {
    console.log('---err', err);
    // setinfoAttention(err.message);
    // setAttention(true)
  }
}

export default deleteCarWatcher