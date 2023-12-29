import { APICore } from 'helpers/api';

function getMenuItems(payload:any) {
    const baseUrl = 'http://localhost:4000/api/getadminMenu';
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export {
    getMenuItems,
};
