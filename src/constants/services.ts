export interface MonthsTypes {
    label:string;
    value:string;
}

const Months: MonthsTypes[] = [
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
    { value: 'December', label: 'December' },
];

const ServiceTypes = [
    {
        label: 'Archana',
        value: 'Archana',
    },
    {
        label: 'Abhishekam',
        value: 'Abhishekam',
    },
    {
        label: 'Homam',
        value: 'Homam',
    },
    {
        label: 'Alankaram',
        value: 'Alankaram',
    },
    {
        label: 'Seva',
        value: 'Seva',
    },
    {
        label: 'Pooja',
        value: 'Pooja',
    },
    {
        label: 'Utasavam',
        value: 'Utasavam',
    },
];

const numberOfDaysAhead = [
    { id: '1 day', name: '1 day' },
    { id: '2 days', name: '2 days' },
    { id: '3 days', name: '3 days' },
    { id: '4 days', name: '4 days' },
    { id: '5 days', name: '5 days' },
    { id: '6 days', name: '6 days' },
    { id: '7 days', name: '7 days' },
    { id: '8 days', name: '8 days' },
    { id: '9 days', name: '9 days' },
    { id: '10 days', name: '10 days' },
    { id: '11 days', name: '11 days' },
    { id: '12 days', name: '12 days' },
    { id: '13 days', name: '13 days' },
    { id: '14 days', name: '14 days' },
    { id: '15 days', name: '15 days' },
];

const bookingTypes = [
    { id: 'Regular', name: 'Regular' },
    { id: 'Pre-Booking', name: 'Pre-Booking' },
];

const Days = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
];

const Frequency = [
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'yearly', name: 'Yearly' },
];

export {
    Months, ServiceTypes, numberOfDaysAhead, bookingTypes, Days, Frequency,
};
