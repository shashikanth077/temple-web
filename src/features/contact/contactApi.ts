import { APICore } from 'helpers/api';

function getContacts(payload:any) {
    const baseUrl = 'http://localhost:4000/api/getContacts/';
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

function sendContact(payload:any) {
    const baseUrl = 'http://localhost:8080/api/sendEnquiry';
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

export { getContacts, sendContact };
