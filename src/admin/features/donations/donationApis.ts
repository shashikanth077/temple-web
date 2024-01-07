import { APICore } from 'helpers/api';

/* eslint-disable */
export function getServiceById(payload:any) {
    const baseUrl = 'http://localhost:8080/api/services/'+payload._id;;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function getServicesDetails(payload:any) {
    const baseUrl = 'http://localhost:8080/api/services';
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function addServices(payload:any) {
    const baseUrl = 'http://localhost:8080/api/service/'+payload.get('godId');
    const response = APICore.createWithFile(`${baseUrl}`, payload);
    return response;
}

export function editServices(payload:any) {
    const baseUrl = 'http://localhost:8080/api/service/'+payload.get('godId')+'/'+payload.get('_id');
    const response = APICore.createWithFileUpdate(`${baseUrl}`, payload);
    return response;
}

export function deleteServices(payload:any) {
    const baseUrl = 'http://localhost:8080/api/service/'+payload._id;
    const response = APICore.update(`${baseUrl}`,{});
    return response;
}
