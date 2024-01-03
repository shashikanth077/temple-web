export interface Report {
    tickerId:string;
    did:number;
    firstName:string;
    serviceName:string;
    NoOfTickets:number,
    manualTicket:number;
    cost:number;
    totalAmount:number;
    paymentType:string;
}

export interface ReportsRes {
    success:boolean;
    reports:Report[];
    errorMessage:string;
    errorCode:number;
    message:string;
}
