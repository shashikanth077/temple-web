import { APICore } from 'helpers/api';

/* eslint-disable */
export function getBookingById(payload:any) {
    const baseUrl = 'http://localhost:8080/api/seva/booking/'+payload._id;;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function getBookingsDetails(payload:any) {
    const baseUrl = 'http://localhost:8080/api/seva/booking-details';
    const response = APICore.create(`${baseUrl}`, {});
    return response;
}

export function addBookings(payload:any) {
    const baseUrl = 'http://localhost:8080/api/seva/booking';
    const response = APICore.createWithFile(`${baseUrl}`, payload);
    return response;
}

export function editBookings(payload:any) {
    const baseUrl = 'http://localhost:8080/api/seva/booking/'+payload.get('_id');
    const response = APICore.createWithFileUpdate(`${baseUrl}`, payload);
    return response;
}

export function deleteBookings(payload:any) {
    const baseUrl = 'http://localhost:8080/api/seva/booking/'+payload._id;
    const response = APICore.delete(`${baseUrl}`);
    return response;
}
