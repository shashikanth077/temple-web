import {
    Action, configureStore, ThunkAction,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {
    persistStore,
    persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootSaga from './Saga';
import rootReducer from './reducers';

const persistConfig = {
    key: 'arora',
    version: 1.0,
    storage,
    blacklist: [
        'adminVoltr',
        'adminuser',
        'myprofile',
        'apiState',
        'adminproduct',
        'login',
        'about',
        'product',
        'menu',
        'staff',
        'events',
        'contact',
        'sendcontact',
    ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(sagaMiddleware),
});

export const persistor:any = persistStore(store);

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
