import { APICore } from 'helpers/api';

/* eslint no-underscore-dangle: 0 */
export function getMyProfileDetails(payload:any) {
    const baseUrl = `http://localhost:8080/api/profile/${payload.userid}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function updateProfiles(payload:any) {
    const baseUrl = `http://localhost:8080/api/profile/${payload.userid}`;
    const response = APICore.update(`${baseUrl}`, payload);
    return response;
}

export function addFamily(payload:any) {
    const baseUrl = `http://localhost:8080/api/family/${payload.userid}`;
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

export function editFamily(payload:any) {
    const baseUrl = `http://localhost:8080/api/family/${payload.userid}/${payload.id}`;
    const response = APICore.update(`${baseUrl}`, payload);
    return response;
}

export function deleteFamily(payload:any) {
    const baseUrl = 'http://localhost:4000/api/deletefamily/';
    const response = APICore.delete(`${baseUrl}`);
    return response;
}

export function getFamilyIdData(payload:any) {
    const baseUrl = `http://localhost:8080/api/family/${payload.userid}/${payload.id}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function getFamilyList(payload:any) {
    const baseUrl = `http://localhost:8080/api/families/${payload.userid}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function addDeasedRow(payload:any) {
    const baseUrl = 'http://localhost:4000/api/addDeasedPerson';
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

export function editDeasedRow(payload:any) {
    const baseUrl = 'http://localhost:4000/api/updateDeased';
    const response = APICore.update(`${baseUrl}`, payload);
    return response;
}

export function deleteDeceasedRow(payload:any) {
    const baseUrl = 'http://localhost:4000/api/deletedeceased/';
    const response = APICore.delete(`${baseUrl}`);
    return response;
}

export function getDeasedIdData(payload:any) {
    const baseUrl = 'http://localhost:4000/api/getDeasedByid';
    const response = APICore.get(`${baseUrl}`, payload);
    return response;
}
