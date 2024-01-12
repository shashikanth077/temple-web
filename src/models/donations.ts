export interface DonationTypes {
    _id:string;
    type: string;
    image:string;
    description: string;
    frequency:string;
    denominations:string;
}

export interface DonationTypesSingle {
    success:boolean;
    donationtype:DonationTypes;
    errorMessage:string;
    errorCode:number;
    message:string;
}

export interface DonationTypesList {
    success:boolean;
    donationtypes:DonationTypes[];
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
