/* eslint-disable @typescript-eslint/no-explicit-any */
export const isDefined = (value: any): boolean => typeof value !== 'undefined';

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
