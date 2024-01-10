import { APICore } from 'helpers/api';

/* eslint-disable */
export function getDonationById(payload:any) {
    const baseUrl = 'http://localhost:4000/api/donationtype/'+payload._id;;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function getDonationsDetails(payload:any) {
    const baseUrl = 'http://localhost:4000/api/donationtypes';
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function addDonations(payload:any) {
    const baseUrl = 'http://localhost:4000/api/Donation/'+payload.get('godId');
    const response = APICore.createWithFile(`${baseUrl}`, payload);
    return response;
}

export function editDonations(payload:any) {
    const baseUrl = 'http://localhost:4000/api/Donation/'+payload.get('godId')+'/'+payload.get('_id');
    const response = APICore.createWithFileUpdate(`${baseUrl}`, payload);
    return response;
}

export function deleteDonations(payload:any) {
    const baseUrl = 'http://localhost:4000/api/Donation/'+payload._id;
    const response = APICore.update(`${baseUrl}`,{});
    return response;
}
