import { APICore } from 'helpers/api';

/* eslint-disable */
export function getReportList(payload:any) {
    const baseUrl = `http://localhost:8080/api/getTranscation`;
    const response = APICore.get(`${baseUrl}`, payload);
    return response;
}
