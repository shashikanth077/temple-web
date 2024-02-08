import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    SuccesResponse, DeasedListResponse, ProfileData, FamilySingleResponse, DeasedSingleResponse, DeceasedData, FamilyData, FamilyResponse,
} from 'models';

export interface ProfilePayload {
    userid: string | undefined;
}

export interface FamilyReqPayload {
    userid: string | undefined ;
}

export interface FamilyUpdatePayload {
    userid: string | undefined ;
    id:string | undefined ;
}
export interface DeasedListPayload {
    userid: string | undefined ;
}

export interface DeceasedUpdatePayload {
    userid: string | undefined ;
    id:string | undefined ;
}
export interface myProfileState {
    loading?: boolean;
    list:any;
    deceased:any;
    deceasedlist:any;
    error:any;
    family:any;
    families:any;
    message:string;
}

const initialState: myProfileState = {
    loading: false,
    list: [],
    families: [],
    deceased: {},
    deceasedlist: [],
    family: {},
    error: undefined,
    message: '',
};

const MyProfileSlice = createSlice({
    name: 'myprofile',
    initialState,
    reducers: {
        getMyProfileDetails(state, action: PayloadAction<ProfilePayload>) {
            state.loading = true;
        },
        myProfileDetailsSuccess(state, action: PayloadAction<any>) {
            state.list = action.payload.profile;
        },
        updateProfile(state, action: PayloadAction<ProfileData>) {
            state.loading = true;
        },
        getFamilById(state, action:PayloadAction<FamilyUpdatePayload>) {
            state.loading = false;
        },
        getFamily(state, action:PayloadAction<FamilyReqPayload>) {
            state.loading = false;
        },
        getFamilySuccess(state, action:PayloadAction<FamilyResponse>) {
            state.loading = false;
            state.families = action.payload.familyDetails;
        },
        getFamilByIdSuccess(state, action:PayloadAction<FamilySingleResponse>) {
            state.loading = false;
            state.family = action.payload.familyDetails;
        },
        getFamilByIdFailure(state, action:PayloadAction<string>) {
            state.loading = false;
        },
        addFamily(state, action:PayloadAction<FamilyData>) {
            state.loading = false;
        },
        updateFamily(state, action:PayloadAction<FamilyData>) {
            state.loading = false;
        },
        deleteFamily(state, action:PayloadAction<FamilyUpdatePayload>) {
            state.loading = false;
        },
        getDeceasedById(state, action:PayloadAction<DeceasedUpdatePayload>) {
            state.loading = false;
        },
        getDeceasedByIdSuccess(state, action:PayloadAction<DeasedSingleResponse>) {
            state.loading = false;
            state.deceased = action.payload.deceased;
        },
        getDeceasedByIdFailure(state, action:PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        getDeceasedListByUserId(state, action:PayloadAction<DeasedListPayload>) {
            state.loading = false;
        },
        getDeceasedListByUserIdSuccess(state, action:PayloadAction<DeasedListResponse>) {
            state.loading = false;
            state.deceasedlist = action.payload.deceasedlist;
        },
        addDeceased(state, action:PayloadAction<DeceasedData>) {
            state.loading = false;
        },
        updateDeceased(state, action:PayloadAction<DeceasedData>) {
            state.loading = false;
        },
        deleteDeceased(state, action:PayloadAction<DeceasedUpdatePayload>) {
            state.loading = false;
        },
        deleteDeceasedSuccess(state, action:PayloadAction<SuccesResponse>) {
            state.loading = false;
            state.message = action.payload.message;
        },
        deleteDeceasedFailure(state, action:PayloadAction<string>) {
            state.loading = false;
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// Actions
export const myprofileActions = MyProfileSlice.actions;

// Reducer
const myProfileReducer = MyProfileSlice.reducer;
export default myProfileReducer;
