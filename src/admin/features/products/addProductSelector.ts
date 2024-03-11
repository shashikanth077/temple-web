import { RootState } from 'storeConfig/store';

export const selectaddAdminloadingStatus = (state: RootState) => {
    const { loading, error, message } = state.admin.adminproduct;

    const adminaddProductState = {
        loading,
        error,
        message,
    };
    return adminaddProductState;
};

export const selectProductsList = (state: RootState) => state.admin.adminproduct.products;
