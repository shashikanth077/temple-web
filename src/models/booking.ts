export interface Booking {
    _id:string;
    amount:string;
    category:string;
    bookingType: string;
    name: string;
    image:string;
    description:string
}

export interface BookingTypeList {
    _id:string;
    bookings:string[];
    message:string;
    success:boolean;
    errorMessage:string;
    errorCode:number;
  }

export interface BookinSingleList {
    _id:string;
    booking:any;
    message:string;
    success:boolean;
    errorMessage:string;
    errorCode:number;
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

export interface SevaBookData {
    category:string;
    NoOfPerson:number;
    userId:string;
    name:string;
    amount:number;
    comments:string;
    bookingDate:string;
  }

export interface OrderBookingHistoryRes {
    _id:string;
    orders:any;
    message:string;
    success:boolean;
    errorMessage:string;
    errorCode:number;
  }

export interface orderRequest {
    type:string;
    userId:string;
}
