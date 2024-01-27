import { APICore } from 'helpers/api';

// account
function login(payload:any) {
    const baseUrl = 'http://localhost:8080/api/auth/signin';
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

function checkProfileStatus(payload:any) {
    const baseUrl = `http://localhost:8080/api/profile/${payload.userid}`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

function logout() {
    const baseUrl = 'http://localhost:8080/api/auth/signout/';
    return APICore.create(`${baseUrl}`, {});
}

function signup(payload:any) {
    const baseUrl = 'http://localhost:8080/api/auth/signup';
    const response = APICore.create(`${baseUrl}`, payload);
    return response;
}

function AccountActivation(payload:any) {
    const baseUrl = `http://localhost:8080/activate/${payload.token}`;
    const response = APICore.get(`${baseUrl}`, {});
    console.log('response', response);
    return response;
}

function forgotPassword(payload:any) {
    const baseUrl = 'http://localhost:8080/api/auth/requestResetPassword';
    return APICore.create(`${baseUrl}`, payload);
}

function resetPasswordCall(payload:any) {
    const baseUrl = 'http://localhost:8080/api/auth/resetPassword';
    return APICore.create(`${baseUrl}`, payload);
}

export {
    login, logout, signup, forgotPassword, resetPasswordCall, checkProfileStatus, AccountActivation,
};
