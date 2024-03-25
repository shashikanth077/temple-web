import { APICore } from 'helpers/api';
import { config } from 'config/Env';

function getContacts(payload: any) {
    const baseUrl = `${config.API_BASE_URL}/api/getContacts/`;
    const response = APICore.get(baseUrl, {});
    return response;
}

function sendContact(payload: any) {
    const baseUrl = `${config.API_BASE_URL}/api/sendEnquiry`;
    const response = APICore.create(baseUrl, payload);
    return response;
}

export { getContacts, sendContact };
