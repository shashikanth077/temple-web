// apiSlice.js
import { createSlice } from '@reduxjs/toolkit';

interface ApiState {
    loading: boolean
    error?: null,
    successMessage: null,
}
const initialState: ApiState = {
    loading: false,
    error: null,
    successMessage: null,
};

const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        startLoading: state => {
            state.loading = true;
        },
        endLoading: state => {
            state.loading = false;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSuccessMessage: (state, action) => {
            state.successMessage = action.payload;
        },
        clearState: state => {
            state.loading = false;
            state.error = null;
            state.successMessage = null;
        },
    },
});

export const {
    startLoading,
    endLoading,
    setError,
    setSuccessMessage,
    clearState,
} = apiSlice.actions;

export default apiSlice.reducer;
