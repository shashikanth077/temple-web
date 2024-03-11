import {
    combineReducers,
} from '@reduxjs/toolkit';
import adminReducer from './admin/adminStore';
import memberReducer from './member/memberStore';
import publicReducer from './public/publicStore';

const rootReducer = combineReducers({
    admin: adminReducer,
    member: memberReducer,
    public: publicReducer,
});

export default rootReducer;
