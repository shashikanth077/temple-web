import { APICore } from 'helpers/api';
import { config } from 'config/Env';

/* eslint-disable */
/**
 * Retrieves a donation by its ID.
 * @param payload - The payload containing the ID of the donation.
 * @returns A Promise that resolves to the response from the API.
 */
export function getDonationById(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/donation-type/${payload._id}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

/**
 * Retrieves donations by type.
 * @param payload - The payload containing the donation type.
 * @returns A Promise that resolves to the response from the API.
 */
export function getDonationByType(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/donations-type/${payload.type}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

/**
 * Retrieves the details of donations.
 * @param payload - The payload for the API request.
 * @returns A Promise that resolves to the response of the API request.
 */
export function getDonationsDetails(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/donation-type/details`;
    const response = APICore.create(`${baseUrl}`, {});
    return response;
}

/**
 * Adds a new donation.
 * @param payload - The payload containing the donation data.
 * @returns A Promise that resolves to the response from the API.
 */
export function addDonations(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/donation-type`;
    const response = APICore.createWithFile(`${baseUrl}`, payload);
    return response;
}

/**
 * Edits a donation by sending a request to the server.
 * @param payload - The payload containing the donation data to be edited.
 * @returns A Promise that resolves to the response from the server.
 */
export function editDonations(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/donation-type/${payload.get('_id')}`;
    const response = APICore.createWithFileUpdate(`${baseUrl}`, payload);
    return response;
}

/**
 * Deletes a donation based on the provided payload.
 * @param payload - The payload containing the donation details.
 * @returns A promise that resolves to the response from the API.
 */
export function deleteDonations(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/donation-type/${payload._id}`;
    const response = APICore.delete(`${baseUrl}`);
    return response;
}
