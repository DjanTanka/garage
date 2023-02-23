import { put, takeLatest } from 'redux-saga/effects';
import { createCar } from '../../../apolloClient/mutations/car';
import { TCar } from '../../interfaces';
import { addCarsOfUser } from '../../slices/cars' 

function* addCarWatcher() {
  yield takeLatest('ADD_CAR', addCarWorker)
}

function* addCarWorker(payload: any) {
  const { payload: { 
    setModalAddCar,
    setAttention,
    setinfoAttention,
    ...carInput}
  } = payload
  try {
    const car: TCar[] = yield createCar({
      carInput
  })
  yield put(addCarsOfUser(car))  
  yield setModalAddCar(false)
  } catch (err: any) {
    
    setinfoAttention(err.message);
    setAttention(true)
  }
}

export default addCarWatcher