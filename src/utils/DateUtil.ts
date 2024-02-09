import moment from 'moment';

export const formatDate = (Date:string) => moment(Date).format('YYYY-MM-DD');
