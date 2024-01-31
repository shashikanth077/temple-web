import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Content } from 'models';

export interface ContentState {
    loading?: boolean;
    services:any;
    shop:any;
    home:any;
    adminmenu:any;
    publicmenu:any;
    registration:any;
    about:any;
    topbar:any;
    staff:any;
    header:any;
    footer:any;
    ads:any;
    contactdetails:any;
    contactform:any;
    volunteers:any;
}

const initialState: ContentState = {
    loading: false,
    services: '',
    adminmenu: '',
    publicmenu: '',
    staff: '',
    topbar: '',
    ads: '',
    contactform: '',
    contactdetails: '',
    shop: '',
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
        },
    },
});

export const admincontentActions = contentSlice.actions;
export const admincontentReducer = contentSlice.reducer;
