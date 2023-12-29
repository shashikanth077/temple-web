import { Menu, ListResponse } from '../../models';
import axiosClient from 'utils/services';

export const menuApi = {
    getAll(): Promise<ListResponse<Menu>> {
        const url = 'http://localhost:4000/api/getmenuItems';
        return axiosClient.get(url, {
            params: {
                _page: 1,
                _limit: 10,
            },
        });
    },
};
