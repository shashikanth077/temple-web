import { APICore } from 'helpers/api';
import { config } from 'config/Env';

/* eslint-disable */
export function getBookingList(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/mybookings`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function getSevaTypes(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/sevas`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

