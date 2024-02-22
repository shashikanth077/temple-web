import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Content } from 'models';

export interface ContentState {
    loading?: boolean;
    services:any;
    shop:any;
    godmaster:any;
    home:any;
    adminmenu:any;
    publicmenu:any;
    registration:any;
    about:any;
    topbar:any;
    staff:any;
    donations:any;
    header:any;
    users:any;
    bookings:any;
    footer:any;
    ads:any;
    contactdetails:any;
    contactform:any;
    volunteers:any;
    taxreceipt:any;
    adminvolunteers:any;
    events:any;
    sitestaticdata:any;
}

const initialState: ContentState = {
    loading: false,
    services: '',
    adminmenu: '',
    godmaster: '',
    bookings: '',
    events: '',
    sitestaticdata: '',
    publicmenu: '',
    donations: '',
    staff: '',
    users: '',
    topbar: '',
    ads: '',
    taxreceipt: '',
    contactform: '',
    contactdetails: '',
    shop: '',
    adminvolunteers: '',
    footer: '',
    about: '',
    header: '',
    volunteers: '',
    home: '',
    registration: '',
};

const contentSlice = createSlice({
    name: 'staticcontent',
    initialState,
    reducers: {
        getStaticContent(state) {
            state.loading = true;
        },
        getStaticContentSuccess(state, action: PayloadAction<Content>) {
            state.services = action.payload.data.contentData.content.services;
            state.shop = action.payload.data.contentData.content.shop;
            state.home = action.payload.data.contentData.content.home;
            state.registration = action.payload.data.contentData.content.registration;
            state.about = action.payload.data.contentData.content.FrontEnd.About;
            state.topbar = action.payload.data.contentData.content.FrontEnd.Topbar;
            state.header = action.payload.data.contentData.content.FrontEnd.Header;
            state.footer = action.payload.data.contentData.content.FrontEnd.Footer;
            state.contactdetails = action.payload.data.contentData.content.FrontEnd.ContactDetails;
            state.contactform = action.payload.data.contentData.content.FrontEnd.ContactUsForm;
            state.ads = action.payload.data.contentData.content.FrontEnd.Adverstiments;
            state.staff = action.payload.data.contentData.content.FrontEnd.Staffs;
            state.adminmenu = action.payload.data.contentData.content.adminMenus;
            state.publicmenu = action.payload.data.contentData.content.FrontMenus;
            state.volunteers = action.payload.data.contentData.content.FrontEnd.Volunteers;
            state.taxreceipt = action.payload.data.contentData.content.FrontEnd.TaxReceipt;
            state.bookings = action.payload.data.contentData.content.bookings;
            state.donations = action.payload.data.contentData.content.donations;
            state.events = action.payload.data.contentData.content.events;
            state.godmaster = action.payload.data.contentData.content.godmaster;
            state.users = action.payload.data.contentData.content.users;
            state.adminvolunteers = action.payload.data.contentData.content.volunteers;
            state.sitestaticdata = action.payload.data.contentData.content.sitemanage;
        },
    },
});

export const admincontentActions = contentSlice.actions;
export const admincontentReducer = contentSlice.reducer;
