import { APICore } from 'helpers/api';

/* eslint no-underscore-dangle: 0 */
export function getEventById(payload:any) {
    const baseUrl = `http://localhost:8080/api/event/${payload._id}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function addEvent(payload:any) {
    const baseUrl = 'http://localhost:8080/api/events';
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

export function updateEvent(payload:any) {
    const baseUrl = `http://localhost:8080/api/event/${payload._id}`;
    const response = APICore.update(`${baseUrl}`, payload);
    return response;
}

export function deleteEvent(payload:any) {
    const baseUrl = `http://localhost:8080/api/event/delete/${payload._id}`;
    const response = APICore.delete(`${baseUrl}`);
    return response;
}
