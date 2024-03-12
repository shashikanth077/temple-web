import { APICore } from 'helpers/api';

/* eslint-disable */
export function getServiceById(payload:any) {
    const baseUrl = 'http://localhost:8080/api/service/'+payload._id;;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}


