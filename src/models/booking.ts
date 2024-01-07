export interface Booking {
    _id:string;
    bookingType: string;
    bookingName: string;
    image:string;
    description:string
}

export interface Bookings {
    _id:string;
    type: string;
    totalAmount:string;
    orderDate:string;
    orderStatus:string;
    programDate:string;
}

export interface BookingSingleRes {
    success:boolean;
    booking:Bookings;
    errorMessage:string;
    errorCode:number;
    message:string;
}

export interface BookingRes {
    success:boolean;
    bookings:Bookings[];
    errorMessage:string;
    errorCode:number;
    message:string;
}
