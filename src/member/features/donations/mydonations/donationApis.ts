import { APICore } from 'helpers/api';
import { config } from 'config/Env';

/* eslint-disable */
export function getDonationList(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/donation/${payload.userid}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function getStripeSessionId(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/create-checkout-session`;
    const response = APICore.get(`${baseUrl}`, payload);
    return response;
}

export async function getStripeSessionIdAysn(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/create-checkout-session`;
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}


export async function createPaymentIntent(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/create-payment-intent`;
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

export async function storeDonationHistory(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/donation/${payload.userId}`;
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

export async function generatePdf(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/generatepdf`;
    const response = APICore.create(`${baseUrl}`, payload,'pdfdownload');
    return response;
}
