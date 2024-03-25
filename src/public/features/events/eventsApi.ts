import { APICore } from 'helpers/api';
import { config } from 'config/Env';

export function getEvents() {
    const baseUrl = `${config.API_BASE_URL}/api/events`;
    const response = APICore.get(baseUrl, {});
    return response;
}

export function getEventsByFilter() {
    const baseUrl = `${config.API_BASE_URL}/api/events/filter`;
    const response = APICore.get(baseUrl, {});
    return response;
}
