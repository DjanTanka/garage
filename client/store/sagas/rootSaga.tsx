import { all } from "@redux-saga/core/effects";
import addCarWatcher from "./car/createCar";
import deleteCarWatcher from "./car/deleteCar";
import activateUserWatcher from "./user/activateUser";
import createUserWatcher from "./user/createUser";
import getUserByWatcher from "./user/getUserById";
import getUsersWatcher from "./user/getUsers";
import loginUserWatcher from "./user/loginUser";
import logOutUserWatcher from "./user/logOutUser"

export default function* rootSaga() {
  yield all([
    createUserWatcher(),
    getUsersWatcher(),
    activateUserWatcher(),
    loginUserWatcher(),
    getUserByWatcher(),
    logOutUserWatcher(),
    
    addCarWatcher(),
    deleteCarWatcher()
  ]);
}
