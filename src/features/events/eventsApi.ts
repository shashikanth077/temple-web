import { APICore } from 'helpers/api';

export function getEvents() {
    const baseUrl = 'http://localhost:8080/api/events';
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function bookEvent(payload:any) {
    const baseUrl = 'http://localhost:8080/api/event-booking';
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}
