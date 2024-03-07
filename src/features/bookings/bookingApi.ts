import { APICore } from 'helpers/api';

/* eslint-disable */
export function getBookingList(payload:any) {
    const baseUrl = `http://localhost:4000/api/mybookings`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function getSevaTypes(payload:any) {
    const baseUrl = `http://localhost:8080/api/sevas`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

//same apis for all order history for user
export function getShoppingOrders(payload:any) {
    const baseUrl = `http://localhost:8080/api/orders/${payload.userId}/${payload.type}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}


export function bookSeva(payload:any) {
    const baseUrl = `http://localhost:8080/api/booking`;
    const response = APICore.create(`${baseUrl}`,payload);
    return response;
}