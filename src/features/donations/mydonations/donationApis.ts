import { APICore } from 'helpers/api';

/* eslint-disable */
export function getDonationList(payload:any) {
    const baseUrl = `http://localhost:8080/api/donation/${payload.userid}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function getStripeSessionId(payload:any) {
    const baseUrl = `http://localhost:8080/api/create-checkout-session`;
    const response = APICore.get(`${baseUrl}`, payload);
    return response;
}

export async function getStripeSessionIdAysn(payload:any) {
    const baseUrl = `http://localhost:8080/api/create-checkout-session`;
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}


export async function createPaymentIntent(payload:any) {
    const baseUrl = `http://localhost:8080/api/create-payment-intent`;
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

export async function storeDonationHistory(payload:any) {
    const baseUrl = `http://localhost:8080/api/donation/${payload.userId}`;
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}


