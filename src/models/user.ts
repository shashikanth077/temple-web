export interface User {
    _id:string | undefined;
    email: string;
    password?:string;
    phonenumber:string;
    roles:any;
    viewRoles:string[];
    firstName:string;
    lastName:string;
    activated:boolean;
}

export interface userResponse{
  errorMessage:string;
  success:boolean;
  message:string;
  errorCode:number;
  userViewData:User[]
}

export interface userSingleResponse{
  errorMessage:string;
  success:boolean;
  errorCode:number;
  userData:User;
}

export interface LoginUser {
  id:string;
  email:string;
  roles:string[];
}

export interface forgotResPassword {
  link: string;
}

export interface FamilyData {
  id:string;
  userid:string;
  firstName: string;
  lastName:string;
  relationship:string;
  dateOfBirth: any;
  star: string;
  gotram: string;
}

export interface DeceasedData {
  id:string | undefined;
  userid:string;
  personName: string;
  tithi:string;
  paksha:string;
  masam:string;
  deathPlace:string;
  relationship:string;
  deathDate: any;
  deathTime: any;
  star: string;
  gotram: string;
}

export interface FamilyResponse{
  errorMessage:string;
  success:boolean;
  errorCode:number;
  familyDetails:FamilyData[]
}

export interface FamilySingleResponse{
  errorMessage:string;
  errorCode:number;
  success:true,
  familyDetails:FamilyData
}

export interface DeasedSingleResponse{
  errorMessage:string;
  errorCode:number;
  success:true,
  deceased:DeceasedData
}

export interface DeasedListResponse{
  errorMessage:string;
  errorCode:number;
  success:true,
  deceasedlist:DeceasedData[]
}

export interface ProfileData {
  _id:string;
  userid:string;
  nationality:string;
  star:string;
  gotram:string;
  dateOfBirth:Date;
  firstName: string;
  lastName:string;
  zipcode:string;
  mobileNumber: string;
  homeNumber: string;
  address1:string;
  address2:string;
  city:string;
  state:string;
  billingaddress:string;
  billingcity:string;
  billingzipcode:string;
  billingstate:string;
  postalCode:string;
  province:string;
  homeAddress: {
    address1: string;
    address2: string;
    city:string;
    postalCode: string;
    province: string;
},
billingAddress: {
    address1: string;
    address2: string;
    city: string;
    postalCode: string;
    province: string;
};

}
