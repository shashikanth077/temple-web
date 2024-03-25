import { APICore } from 'helpers/api';
import { config } from 'config/Env';

// account
function login(payload: any) {
    const baseUrl = `${config.API_BASE_URL}/api/auth/signin`;
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

function checkProfileStatus(payload: any) {
    const baseUrl = `${config.API_BASE_URL}/api/profile/${payload.userid}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

function logout() {
    const baseUrl = `${config.API_BASE_URL}/api/auth/signout/`;
    return APICore.create(`${baseUrl}`, {});
}

function signup(payload: any) {
    const baseUrl = `${config.API_BASE_URL}/api/auth/signup`;
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

function AccountActivation(payload: any) {
    const baseUrl = `${config.API_BASE_URL}/activate/${payload.token}`;
    const response = APICore.get(`${baseUrl}`, {});
    console.log('response', response);
    return response;
}

function forgotPassword(payload: any) {
    const baseUrl = `${config.API_BASE_URL}/api/auth/requestResetPassword`;
    return APICore.create(`${baseUrl}`, payload);
}

function resetPasswordCall(payload: any) {
    const baseUrl = `${config.API_BASE_URL}/api/auth/resetPassword`;
    return APICore.create(`${baseUrl}`, payload);
}

function sendOTP(payload: any) {
    const baseUrl = `${config.API_BASE_URL}/api/generateotp`;
    return APICore.create(`${baseUrl}`, payload);
}

function verifyOTP(payload: any) {
    const baseUrl = `${config.API_BASE_URL}/api/verifyotp`;
    return APICore.create(`${baseUrl}`, payload);
}

export {
    login, logout, signup, forgotPassword, resetPasswordCall, checkProfileStatus, AccountActivation, sendOTP, verifyOTP,
};
