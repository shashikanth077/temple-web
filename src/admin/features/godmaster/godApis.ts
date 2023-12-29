import { APICore } from 'helpers/api';

/* eslint-disable */
export function getGodByIdDetails(payload:any) {
    const baseUrl = `http://localhost:8080/api/god/${payload._id}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function getGodsDetails(payload:any) {
    const baseUrl = 'http://localhost:8080/api/gods';
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function addGods(payload:any) {
    const baseUrl = 'http://localhost:8080/api/god';
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

export function editGods(payload:any) {
    const baseUrl =`http://localhost:8080/api/god/${payload._id}`;
    const response = APICore.update(`${baseUrl}`, payload);
    return response;
}

export function deleteGods(payload:any) {
    const baseUrl = `http://localhost:8080/api/god/delete/${payload._id}`;
    const response = APICore.delete(`${baseUrl}`);
    return response;
}
