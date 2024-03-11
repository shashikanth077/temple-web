import {
    combineReducers,
} from '@reduxjs/toolkit';
import { adminmenuReducer } from 'admin/layout/menu/menuSlice';
import { adminlayoutReducer } from 'admin/layout/layoutSlice';
import { adminProductReducer } from 'admin/features/products/adminProductSlice';
import myProfileReducer from 'admin/features/myprofile/myProfileSlice';
import { admingodReducer } from 'admin/features/godmaster/godSlice';
import { adminServiceReducer } from 'admin/features/services/serviceSlice';
import { adminEventReducer } from 'admin/features/events/adminEventSlice';
import { adminUserReducer } from 'admin/features/users/userSlice';
import { adminGroceryReducer } from 'admin/features/grocery/adminGrocerySlice';
import { GroceryCartReducer } from 'member/features/donations/grocery/grocerySlice';
import { adminReportsReducer } from 'admin/features/reports/reportsSlice';
import { adminBookingReducer } from 'admin/features/bookings/bookingSlice';
import { adminDonationTypeReducer } from 'admin/features/donations/donationSlice';
import { adminSiteManagerReducer } from 'admin/features/sitemanager/siteManagerSlice';
import { adminVolunteersReducer } from 'admin/features/volunteers/volunteerSlice';

const adminReducer = combineReducers({
    adminmenu: adminmenuReducer,
    adminlayout: adminlayoutReducer,
    adminproduct: adminProductReducer,
    myprofile: myProfileReducer,
    gods: admingodReducer,
    adminService: adminServiceReducer,
    adminEvent: adminEventReducer,
    adminuser: adminUserReducer,
    admingrocery: adminGroceryReducer,
    donategrocert: GroceryCartReducer,
    reports: adminReportsReducer,
    adminbookingtypes: adminBookingReducer,
    admindonationtypes: adminDonationTypeReducer,
    adminStatic: adminSiteManagerReducer,
    adminVoltr: adminVolunteersReducer,
});

export default adminReducer;
