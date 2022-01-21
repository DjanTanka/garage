import rootReducer from './slices/rootReducer'
import createSagaMiddleware from 'redux-saga'
import {
  Action,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
} from '@reduxjs/toolkit';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const middleware = [...getDefaultMiddleware({ thunk: true , serializableCheck: false}), ...middlewares];

export const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
})

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,RootState,unknown,Action<string>>;