/* eslint-disable @typescript-eslint/no-explicit-any */
export const isDefined = (value: any): boolean => typeof value !== 'undefined';

/**
 * Capitalizes the first letter of a string.
 *
 * @param str - The input string.
 * @returns The input string with the first letter capitalized.
 */
export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
