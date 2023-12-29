export interface Event {
    _id:string;
    name: string;
    bookingPrice: string;
    organizerPhone:string;
    organizerEmail:string;
    venue:string;
    startDate: Date;
    endDate: Date;
    organizer: string;
    image:string;
    description:string;
}

export interface EventList{
  events:Event[]
}
export interface EventSingleRes{
    errorMessage:string;
    errorCode:number;
    event:Event;
    success:boolean;
}

export interface EventListRes{
  errorMessage:string;
  errorCode:number;
  events:Event[];
  success:boolean;
}
