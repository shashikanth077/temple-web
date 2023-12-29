import { APICore } from 'helpers/api';

/* eslint-disable */
export function getUsers(payload:any) {
    const baseUrl = `http://localhost:4000/api/users`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}


export function getUserById(payload:any) {
    const baseUrl = `http://localhost:4000/api/getuser/${payload._id}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function addUser(payload:any) {
    const baseUrl = 'http://localhost:8080/api/user';
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

export function updateUser(payload:any) {
    const baseUrl = `http://localhost:8080/api/user/${payload._id}`;
    const response = APICore.update(`${baseUrl}`, payload);
    return response;
}

export function deleteUser(payload:any) {
    const baseUrl = `http://localhost:8080/api/user/delete/${payload._id}`;
    const response = APICore.create(`${baseUrl}`, {});
    return response;
}
