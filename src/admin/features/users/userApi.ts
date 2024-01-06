import { APICore } from 'helpers/api';

/* eslint-disable */
export function getUsers(payload:any) {
    const baseUrl = `http://localhost:8080/api/users`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function getUserById(payload:any) {
    const baseUrl = `http://localhost:8080/api/${payload._id}/user`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function addUser(payload:any) {
    const baseUrl = 'http://localhost:8080/api/user';
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

export function updateRoles(payload:any) {
    const baseUrl = `http://localhost:8080/api/${payload._id}/roles`;
    const response = APICore.update(`${baseUrl}`, payload);
    return response;
}

export function deleteUser(payload:any) {
    const baseUrl = `http://localhost:8080/api/${payload._id}/activate`;
    const response = APICore.update(`${baseUrl}`, payload);
    return response;
}
