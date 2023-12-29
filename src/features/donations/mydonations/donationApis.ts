import { APICore } from 'helpers/api';

/* eslint-disable */
export function getDonationList(payload:any) {
    const baseUrl = `http://localhost:4000/api/mydonations`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}
