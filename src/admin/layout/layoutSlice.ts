import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BarPayload {
    leftSideBarType:string;
}
export interface AdminLayoutState {
    isOpenRightSideBar: boolean;
    leftSideBarType:string;
}

const initialState: AdminLayoutState = {
    isOpenRightSideBar: false,
    leftSideBarType: 'default',
};

const adminLayoutSlice = createSlice({
    name: 'adminlayout',
    initialState,
    reducers: {
        setShowRightBar(state) {
            state.isOpenRightSideBar = true;
        },
        setHideRightBar(state) {
            state.isOpenRightSideBar = false;
        },
        changeSideBarType(state, action: PayloadAction<BarPayload>) {
            state.leftSideBarType = action.payload.leftSideBarType;
        },
    },
});

// adminLayout Actions
export const adminlayoutActions = adminLayoutSlice.actions;

// adminLayout Reducer
export const adminlayoutReducer = adminLayoutSlice.reducer;
