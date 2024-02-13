export interface ProvinceTypes {
    name:string;
    abbreviation:string;
}

const CAProvinces: ProvinceTypes[] = [
    {
        name: 'Alberta',
        abbreviation: 'AB',
    },
    {
        name: 'British Columbia',
        abbreviation: 'BC',
    },
    {
        name: 'Manitoba',
        abbreviation: 'MB',
    },
    {
        name: 'New Brunswick',
        abbreviation: 'NB',
    },
    {
        name: 'Newfoundland and Labrador',
        abbreviation: 'NL',
    },
    {
        name: 'Northwest Territories',
        abbreviation: 'NT',
    },
    {
        name: 'Nova Scotia',
        abbreviation: 'NS',
    },
    {
        name: 'Nunavut',
        abbreviation: 'NU',
    },
    {
        name: 'Ontario',
        abbreviation: 'ON',
    },
    {
        name: 'Prince Edward Island',
        abbreviation: 'PE',
    },
    {
        name: 'Quebec',
        abbreviation: 'QC',
    },
    {
        name: 'Saskatchewan',
        abbreviation: 'SK',
    },
    {
        name: 'Yukon Territory',
        abbreviation: 'YT',
    },
];

const countryCodes = [
    { code: 'IN', label: '+91' },
    { code: 'CA', label: '+1' },
];

export { CAProvinces, countryCodes };
