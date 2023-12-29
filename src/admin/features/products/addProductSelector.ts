import { RootState } from 'storeConfig/store';

export const selectaddAdminloadingStatus = (state: RootState) => {
    const { loading, error, message } = state.adminproduct;

    const adminaddProductState = {
        loading,
        error,
        message,
    };
    return adminaddProductState;
};
