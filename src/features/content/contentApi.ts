import { APICore } from 'helpers/api';

export function getContents(payload:any) {
    const baseUrl = 'http://localhost:4000/api/getStaticContent';
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}
