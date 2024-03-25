import { config } from 'config/Env';
import { APICore } from 'helpers/api';

/* eslint-disable */
export function getBookingById(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/seva/booking/${payload._id}`;
    const response = APICore.get(baseUrl, {});
    return response;
}

export function getBookingsDetails(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/seva/booking-details`;
    const response = APICore.create(baseUrl, {});
    return response;
}

export function addBookings(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/seva/booking`;
    const response = APICore.createWithFile(baseUrl, payload);
    return response;
}

/**
 * Edits the bookings with the given payload.
 * @param payload - The payload containing the booking details.
 * @returns The response from the API after editing the bookings.
 */
export function editBookings(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/seva/booking/${payload.get('_id')}`;
    const response = APICore.createWithFileUpdate(baseUrl, payload);
    return response;
}

export function deleteBookings(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/seva/booking/${payload._id}`;
    const response = APICore.delete(baseUrl);
    return response;
}
