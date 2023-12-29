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
