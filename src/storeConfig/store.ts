import {
    Action, combineReducers, configureStore, ThunkAction,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { bannerReducer } from '../features/home/homeSlice';
import { menuReducer } from '../layout/menu/menuSlice';
import { serviceReducer } from '../features/services/serviceSlice';
import { eventReducer } from '../features/events/eventsSlice';
import { myBookingsReducer } from '../features/bookings/bookingSlice';
import { staffReducer } from '../features/staffs/staffSlice';
import { adsReducer } from '../features/adversitments/adversimentsSlice';
import { cartReducer } from '../features/shop/cart/cartSlice';
import { AboutReducer } from '../features/home/about/aboutSlice';
import rootSaga from './rootSaga';
import { contactReducer, sendcontactReducer } from 'features/contact/contactSlice';
import authReducer from 'features/auth/login/loginSlice';
import registerReducer from 'features/auth/register/registerSlice';
import forgotpasswordReducer from 'features/auth/login/forgotpassword/forgotpassSlice';
import { productReducer } from 'features/shop/providers/productSlice';
import { adminmenuReducer } from 'admin/layout/menu/menuSlice';
import { adminlayoutReducer } from 'admin/layout/layoutSlice';
import { adminProductReducer } from 'admin/features/products/adminProductSlice';
import myProfileReducer from 'admin/features/myprofile/myProfileSlice';
import { admingodReducer } from 'admin/features/godmaster/godSlice';
import { adminServiceReducer } from 'admin/features/services/serviceSlice';
import apiReducer from 'storeConfig/api/apiSlice';
import { adminEventReducer } from 'admin/features/events/adminEventSlice';
import { admincontentReducer } from 'features/content/contentSlice';
import { adminUserReducer } from 'admin/features/users/userSlice';
import { adminGroceryReducer } from 'admin/features/grocery/adminGrocerySlice';
import { GroceryCartReducer } from 'features/donations/grocery/grocerySlice';
import { mydonationsReducer } from 'features/donations/mydonations/donationSlice';
import { adminReportsReducer } from 'admin/features/reports/reportsSlice';

const rootReducer = combineReducers({
    contact: contactReducer,
    sendcontact: sendcontactReducer,
    banner: bannerReducer,
    menu: menuReducer,
    services: serviceReducer,
    events: eventReducer,
    bookings: myBookingsReducer,
    staff: staffReducer,
    adverstiment: adsReducer,
    cartitems: cartReducer,
    about: AboutReducer,
    login: authReducer,
    register: registerReducer,
    forgotpassword: forgotpasswordReducer,
    product: productReducer,
    adminmenu: adminmenuReducer,
    adminlayout: adminlayoutReducer,
    adminproduct: adminProductReducer,
    myprofile: myProfileReducer,
    gods: admingodReducer,
    adminService: adminServiceReducer,
    apiState: apiReducer,
    adminEvent: adminEventReducer,
    staticContent: admincontentReducer,
    adminuser: adminUserReducer,
    admingrocery: adminGroceryReducer,
    donategrocert: GroceryCartReducer,
    mydonations: mydonationsReducer,
    reports: adminReportsReducer,
});

const persistConfig = {
    key: 'arora',
    version: 1.1,
    storage,
    blacklist: ['myprofile', 'apiState', 'adminproduct', 'login', 'about', 'product', 'menu', 'staff', 'events', 'contact', 'register', 'sendcontact'],
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
