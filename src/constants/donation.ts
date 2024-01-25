interface OptionTypes {
    value: string;
    label: string;
}

const Denominations: Array<OptionTypes> = [
    { value: '500', label: '500' },
    { value: '1000', label: '1000' },
    { value: '2000', label: '2000' },
    { value: '3000', label: '3000' },
    { value: '4000', label: '4000' },
    { value: '5000', label: '5000' },
    { value: '6000', label: '6000' },
    { value: '7000', label: '7000' },
    { value: '8000', label: '8000' },
    { value: '9000', label: '9000' },
    { value: '10000', label: '10000' },
];

const Frequency:any = [
    { id: 'monthly', name: 'Monthly' },
    { id: 'annually', name: 'Annually' },
];

export { Denominations, Frequency };
