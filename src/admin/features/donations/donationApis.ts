import { APICore } from 'helpers/api';

/* eslint-disable */
export function getDonationById(payload:any) {
    const baseUrl = 'http://localhost:8080/api/donation-type/'+payload._id;;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function getDonationByType(payload:any) {
    const baseUrl = 'http://localhost:8080/api/donations-type/'+payload.type
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function getDonationsDetails(payload:any) {
    const baseUrl = 'http://localhost:8080/api/donation-type/details';
    const response = APICore.create(`${baseUrl}`, {});
    return response;
}

export function addDonations(payload:any) {
    const baseUrl = 'http://localhost:8080/api/donation-type';
    const response = APICore.createWithFile(`${baseUrl}`, payload);
    return response;
}

export function editDonations(payload:any) {
    const baseUrl = 'http://localhost:8080/api/donation-type/'+payload.get('_id');
    const response = APICore.createWithFileUpdate(`${baseUrl}`, payload);
    return response;
}

export function deleteDonations(payload:any) {
    const baseUrl = 'http://localhost:8080/api/donation-type/'+payload._id;
    const response = APICore.delete(`${baseUrl}`);
    return response;
}
