/**
 * Retrieves application data by ID from the DOM.
 * @param id - The ID of the DOM element containing the data.
 * @returns The parsed application data, or null if the element is not found or the data cannot be parsed.
 */
export const getAppDataById = (id: string): any => {
    let data = null;
    const inputElement = document.getElementById(id) as HTMLInputElement;

    if (inputElement) {
        try {
            data = JSON.parse(inputElement.value);
        } catch {
            return data;
        }
    }
    return data;
};
