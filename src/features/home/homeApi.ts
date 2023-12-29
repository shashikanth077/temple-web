import { Banner, SingleResponse } from '../../models';
import axiosClient from 'utils/services';

export const bannerApi = {
    getAll(): Promise<SingleResponse<Banner>> {
        const url = 'http://localhost:4000/api/getBanners';
        return axiosClient.get(url, {
            params: {
                _page: 1,
                _limit: 10,
            },
        });
    },
};
