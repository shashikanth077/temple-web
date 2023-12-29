import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    SuccesResponse, ProfileData, FamilySingleResponse, DeasedSingleResponse, DeceasedData, FamilyData,
} from 'models';

export interface ProfilePayload {
    userid: string;
}

export interface FamilyUpdatePayload {
    userid: string | undefined ;
    familyId:string | undefined ;
}
export interface DeceasedUpdatePayload {
    userid: string | undefined ;
    familyId:string | undefined ;
}
export interface myProfileState {
    loading?: boolean;
    list:any;
    deceased:any;
    error:any;
    family:any;
    message:string;
}

const initialState: myProfileState = {
    loading: false,
    list: [],
    deceased: {},
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
        getFamilByIdSuccess(state, action:PayloadAction<FamilySingleResponse>) {
            state.loading = false;
            state.family = action.payload.family;
        },
        getFamilByIdFailure(state, action:PayloadAction<string>) {
            state.loading = false;
        },
        addFamily(state, action:PayloadAction<FamilyData>) {
            state.loading = false;
        },
        addFamilySuccess(state, action:PayloadAction<SuccesResponse>) {
            state.loading = false;
            state.message = action.payload.message;
        },
        addFamilyFailure(state, action:PayloadAction<string>) {
            state.loading = false;
            state.loading = false;
            state.error = action.payload;
        },
        updateFamily(state, action:PayloadAction<FamilyData>) {
            state.loading = false;
        },
        updateFamilySuccess(state, action:PayloadAction<SuccesResponse>) {
            state.loading = false;
            state.family = action.payload;
        },
        updateFamilyFailure(state, action:PayloadAction<string>) {
            state.loading = false;
            state.loading = false;
            state.error = action.payload;
        },
        deleteFamily(state, action:PayloadAction<FamilyUpdatePayload>) {
            state.loading = false;
        },
        deleteFamilySuccess(state, action:PayloadAction<SuccesResponse>) {
            state.loading = false;
            state.message = action.payload.message;
        },
        deleteFamilyFailure(state, action:PayloadAction<string>) {
            state.loading = false;
            state.loading = false;
            state.error = action.payload;
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
        addDeceased(state, action:PayloadAction<DeceasedData>) {
            state.loading = false;
        },
        addDeceasedSuccess(state, action:PayloadAction<SuccesResponse>) {
            state.loading = false;
            state.message = action.payload.message;
        },
        addDeceasedFailure(state, action:PayloadAction<string>) {
            state.loading = false;
            state.loading = false;
            state.error = action.payload;
        },
        updateDeceased(state, action:PayloadAction<DeceasedData>) {
            state.loading = false;
        },
        updateDeceasedSuccess(state, action:PayloadAction<SuccesResponse>) {
            state.loading = false;
            state.message = action.payload.message;
        },
        updateDeceasedFailure(state, action:PayloadAction<string>) {
            state.loading = false;
            state.loading = false;
            state.error = action.payload;
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
        resetProfile(state) {
            state.loading = false;
            state.error = null;
            state.message = '';
        },

    },
});

// Actions
export const myprofileActions = MyProfileSlice.actions;

// Reducer
const myProfileReducer = MyProfileSlice.reducer;
export default myProfileReducer;
