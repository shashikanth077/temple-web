import { APICore } from 'helpers/api';

/* eslint-disable */
export function getBookingById(payload:any) {
    const baseUrl = 'http://localhost:4000/api/bookingtypes/'+payload._id;;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function getBookingsDetails(payload:any) {
    const baseUrl = 'http://localhost:4000/api/bookingtypes';
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function addBookings(payload:any) {
    const baseUrl = 'http://localhost:4000/api/bookingtypes/'+payload.get('godId');
    const response = APICore.createWithFile(`${baseUrl}`, payload);
    return response;
}

export function editBookings(payload:any) {
    const baseUrl = 'http://localhost:4000/api/bookingtypes/'+payload.get('godId')+'/'+payload.get('_id');
    const response = APICore.createWithFileUpdate(`${baseUrl}`, payload);
    return response;
}

export function deleteBookings(payload:any) {
    const baseUrl = 'http://localhost:4000/api/bookingtypes/'+payload._id;
    const response = APICore.update(`${baseUrl}`,{});
    return response;
}
