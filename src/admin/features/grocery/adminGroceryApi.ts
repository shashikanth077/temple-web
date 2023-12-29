import { APICore } from 'helpers/api';

/* eslint-disable */
export function getAllGroceries(payload:any) {
    const baseUrl = `http://localhost:4000/api/groceries`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function getGroceryById(payload:any) {
    const baseUrl = `http://localhost:8080/api/grocery/${payload._id}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function addGrocerys(payload:any) {
    const baseUrl = 'http://localhost:8080/api/grocery';
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

export function updateGrocerys(payload:any) {
    const baseUrl = `http://localhost:8080/api/grocery/${payload._id}`;
    const response = APICore.update(`${baseUrl}`, payload);
    return response;
}

export function deleteGrocerys(payload:any) {
    const baseUrl = `http://localhost:8080/api/grocery/delete/${payload._id}`;
    const response = APICore.create(`${baseUrl}`, {});
    return response;
}
