import { APICore } from 'helpers/api';
import { config } from 'config/Env';

function getMenuItems(payload:any) {
    const baseUrl = `${config.API_BASE_URL}/api/getadminMenu`;
    const response = APICore.get(`${baseUrl}`, {});
    return response;
}

export {
    getMenuItems,
};
