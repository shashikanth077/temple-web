import { APICore } from 'helpers/api';

/* eslint-disable */
export function getBookingList(payload:any) {
    const baseUrl = `http://localhost:4000/api/mybookings`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}
