import { APICore } from 'helpers/api';

/* eslint-disable */
export function getReportList(payload:any) {
    const baseUrl = `http://localhost:4000/api/incomereports`;
    const response = APICore.get(`${baseUrl}`, payload);
    return response;
}
