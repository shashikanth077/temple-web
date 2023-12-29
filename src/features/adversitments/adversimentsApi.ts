import { Adversiments, ListResponse } from '../../models';
import axiosClient from '../../utils/services';

export const adsApi = {
    getAll(): Promise<ListResponse<Adversiments>> {
        const url = 'http://localhost:4000/api/getAdversiments';
        return axiosClient.get(url, {
            params: {
                _page: 1,
                _limit: 10,
            },
        });
    },
};
