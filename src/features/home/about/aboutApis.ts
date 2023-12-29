import { APICore } from 'helpers/api';

// cart data
export function getAboutDetails(payload:any) {
    const baseUrl = 'http://localhost:4000/api/getaboutImages';
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}
