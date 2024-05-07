import { APICore } from 'helpers/api';
import { config } from 'config/Env';

/* eslint no-underscore-dangle: 0 */
export function getMyProfileDetails(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/profile/${payload.userid}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function updateProfiles(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/profile/${payload.userid}`;
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

export function addFamily(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/family/${payload.userid}`;
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

export function editFamily(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/family/${payload.userid}/${payload.id}`;
    const response = APICore.update(`${baseUrl}`, payload);
    return response;
}

export function deleteFamily(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/family/${payload.userid}/${payload.id}`;
    const response = APICore.delete(`${baseUrl}`);
    console.log('delete api', response);
    return response;
}

export function getFamilyIdData(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/family/${payload.userid}/${payload.id}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function getFamilyList(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/families/${payload.userid}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

// Deceased apis
export function getDeceasedList(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/deceasedlist/${payload.userid}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function addDeasedRow(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/deceased/${payload.userid}`;
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

export function editDeasedRow(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/deceased/${payload.userid}/${payload.id}`;
    const response = APICore.update(`${baseUrl}`, payload);
    return response;
}

export function deleteDeceasedRow(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/deceased/${payload.userid}/${payload.id}`;
    const response = APICore.delete(`${baseUrl}`);
    return response;
}

export function getDeasedIdData(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/deceased/${payload.userid}/${payload.id}`;
    const response = APICore.get(`${baseUrl}`, payload);
    return response;
}

export function updatePassword(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/profile/changePassword/${payload.userId}`;
    const response = APICore.update(`${baseUrl}`, payload);
    return response;
}
