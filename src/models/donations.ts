export interface DonationTypes {
    _id:string;
    donationType: string;
    image:string;
    description: string;
    frequency:string;
    denominations:any;
}

export interface DonationTypesSingle {
    success:boolean;
    donationType:DonationTypes;
    errorMessage:string;
    errorCode:number;
    message:string;
}

export interface DonationTypesList {
    success:boolean;
    donationTypeDetails:DonationTypes[];
    errorMessage:string;
    errorCode:number;
    message:string;
}

export interface Donation {
    _id:string;
    Type: string;
    Date: string;
    name:string;
    amount:string;
    address:string;
}

export interface DonationSingleRes {
    success:boolean;
    donation:Donation;
    errorMessage:string;
    errorCode:number;
    message:string;
}

export interface DonationRes {
    success:boolean;
    donations:Donation[];
    errorMessage:string;
    errorCode:number;
    message:string;
}

export interface DonationForm {
    userid:string;
    amount:number;
    type:string;
    frequency:string;
    prasadamOverEmail:boolean;
    donateTypeId:string;
    comments:string;
}
