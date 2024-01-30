// utils.js
import { useIntl } from 'react-intl';

export const formatCurrency = (intl:any, value:any, currencyCode = 'CAD') => {
    try {
        const formattedValue = intl.formatNumber(value, {
            style: 'currency',
            currency: currencyCode,
            currencyDisplay: 'code',
            minimumFractionDigits: 2,
        });

        return `${formattedValue}`;
    } catch (error:any) {
        console.error(`Error formatting currency: ${error.message}`);
        return value; // Return the original value in case of an error
    }
};
