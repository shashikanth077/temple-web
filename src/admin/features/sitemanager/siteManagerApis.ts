import { APICore } from 'helpers/api';

/* eslint-disable */
export function getStaticContentDetails(payload:any) {
    const baseUrl = 'http://localhost:8080/api/content';
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export function UploadStaticFile(payload:any) {
    const baseUrl = 'http://localhost:8080/api/staticupload';;
    const response = APICore.createWithFile(`${baseUrl}`, payload);
    return response;
}

