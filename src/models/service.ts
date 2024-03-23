export interface Service {
    id:number;
    service_image: string;
    main_title: string;
    sub_title:string;
    service_description:string;
  }

export interface AdminService {
    _id:string;
    occurmonth:string;
    frequency:string;
    godId:string;
    daysahead:string;
    serviceType:string;
    serviceName:string;
    description:string;
    image:string;
    bookingType:string;
    price:string;
    accountNumber:string;
    isTaxable:boolean;
}

export interface ServerList {
  _id:string;
  services:string[];
  message:string;
  success:boolean;
  errorMessage:string;
  errorCode:number;
}

export interface ServerSingleList {
  _id:string;
  service:any;
  message:string;
  success:boolean;
  errorMessage:string;
  errorCode:number;
}

export interface GodList {
    _id:string;
    message:string;
    success:boolean;
    gods:string[];
    errorMessage:string;
    errorCode:number;
  }

export interface GodSingleResponse {
    _id:string;
    message:string;
    success:boolean;
    god:any;
    errorMessage:string;
    errorCode:number;
  }

export interface God {
  _id:string;
  name:string;
  description:string;
  worshipDay:any;
}

export interface ServiceBookData {
  category:string;
  NoOfPerson:number;
  userId:string;
  name:string;
  amount:number;
  comments:string;
  bookingDate:string;
}
