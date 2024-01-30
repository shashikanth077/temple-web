import { APICore } from 'helpers/api';

/* eslint-disable */
export function InsertVolunteers(payload:any) {
    const baseUrl = 'http://localhost:8080/api/volunteers';
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}