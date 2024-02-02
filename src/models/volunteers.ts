export interface Voluteers {
    beforevolunteer:boolean;
    description:string;
    email:string;
    address:string;
    city:string;
    state:string;
    zipcode:string;
    possibleDays:any;
    activityList:any;
    otheractivities:string;
    islive:boolean;
    isveg:boolean;
    iswhatsupnumber:boolean;
    name:string;
    phone:string;
}

export interface VoluteersRes {
    errorCode:any;
    success:boolean;
    message:string;
    volunteers:Voluteers[];
    error:string;
    errorMessage:string;
}
