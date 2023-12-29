import moment from 'moment';

export const getFilterEvents = (events:any, sortType:string, sortValue:any) => {
    if (events && sortType && sortValue) {
        if (sortType === 'topsearch') {
            const lowercasedSearchInput = sortValue.toLowerCase();
            return events.filter((event:any) => event.event_name.toLowerCase().match(lowercasedSearchInput));
        }
        if (sortType === 'monthsearch') {
            return events.filter((event:any) => {
                const orderDate = new Date(event.event_startdate);
                return moment(orderDate).format('MM-YYYY') === sortValue;
            });
        }
        if (sortType === 'daysearch') {
            return events.filter((event:any) => {
                const orderDate = new Date(event.event_startdate);
                return moment(orderDate).format('DD-MM-YYYY') === sortValue;
            });
        }
        if (sortType === 'datesearch') {
            return events.filter((event:any) => {
                const orderDate = new Date(event.event_startdate);
                return moment(orderDate).format('DD-MM-YYYY') === moment(sortValue).format('DD-MM-YYYY');
            });
        }
        if (sortType === 'listAll') {
            return events;
        }
    }
    return events;
};
