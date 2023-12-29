import { Service, ListResponse } from '../../models';
import axiosClient from 'utils/services';

export const servicesApi = {
    getAll(): Promise<ListResponse<Service>> {
        const url = 'http://localhost:4000/api/getServices';
        return axiosClient.get(url, {
            params: {
                _page: 1,
                _limit: 10,
            },
        });
    },
};
