import { APICore } from 'helpers/api';

export function getContents(payload:any) {
    const baseUrl = 'http://localhost:8080/api/content';
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}
