import { Staff, ListResponse } from '../../models';
import axiosClient from 'utils/services';

export const staffApi = {
    getAll(): Promise<ListResponse<Staff>> {
        const url = 'http://localhost:4000/api/getStaffs';
        return axiosClient.get(url, {
            params: {
                _page: 1,
                _limit: 10,
            },
        });
    },
};
