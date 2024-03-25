import { APICore } from 'helpers/api';
import { config } from 'config/Env';

/* eslint no-underscore-dangle: 0 */
/**
 * Retrieves an event by its ID.
 * @param payload - The payload containing the event ID.
 * @returns A Promise that resolves to the response from the API.
 */
export function getEventById(payload: { _id: string }) {
    const baseUrl = `${config.API_BASE_URL}/api/event/${payload._id}`;
    const response = APICore.get(baseUrl, {});
    return response;
}

export function getEvents() {
    const baseUrl = `${config.API_BASE_URL}/api/events`;
    const response = APICore.get(baseUrl, {});
    return response;
}

/**
 * Adds an event.
 * @param payload - The payload containing the event data.
 * @returns The response from the API call.
 */
export function addEvent(payload: any) {
    const baseUrl = `${config.API_BASE_URL}/api/events`;
    const response = APICore.createWithFile(baseUrl, payload);
    return response;
}

/**
 * Updates an event.
 * @param payload - The payload containing the event data to be updated.
 * @returns The response from the API call.
 */
export function updateEvent(payload: any) {
    const baseUrl = `${config.API_BASE_URL}/api/event/${payload._id}`;
    const response = APICore.createWithFileUpdate(baseUrl, payload);
    return response;
}

/**
 * Deletes an event.
 * @param payload - The payload containing the event ID.
 * @returns The response from the API call.
 */
export function deleteEvent(payload: any) {
    const baseUrl = `${config.API_BASE_URL}/api/event/delete/${payload._id}`;
    const response = APICore.create(baseUrl, {});
    return response;
}
