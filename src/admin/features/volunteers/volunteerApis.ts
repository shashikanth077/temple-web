import { APICore } from 'helpers/api';

/* eslint-disable */
export function getVolunteersData(payload:any) {
    const baseUrl = 'http://localhost:8080/api/volunteers';
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function volunteerApprove(payload:any) {
    const baseUrl = `http://localhost:8080/api/volunteerapprove`;
    const response = APICore.update(`${baseUrl}`, payload);
    return response;
}





