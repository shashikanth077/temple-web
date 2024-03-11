import { RootState } from 'storeConfig/store';

export const selectSevaList = (state: RootState) => state.public.bookings;
