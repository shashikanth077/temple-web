import { APICore } from 'helpers/api';

export function getEvents() {
    const baseUrl = 'http://localhost:8080/api/events';
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}
