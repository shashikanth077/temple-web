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
  firstName: string;
  lastName:string;
  dob: Date;
  star: string;
  gotram: string;
}

export interface DeceasedData {
  id:string;
  firstName: string;
  lastName:string;
  deathDate: Date;
  star: string;
  gotram: string;
}

export interface FamilySingleResponse{
  errorMessage:string;
  errorCode:number;
  family:FamilyData
}

export interface DeasedSingleResponse{
  errorMessage:string;
  errorCode:number;
  deceased:DeceasedData
}

export interface ProfileData {
  _id:string;
  userid:string;
  dateofbirth:Date;
  firstname: string;
  lastname:string;
  phone: string;
  homenumber: string;
  address1:string;
  address2:string;
  city:string;
  postalCode:string;
  province:string;
  billingaddress1:string;
  billingaddress2:string;
  billingcity:string;
  billingpostalcode:string;
  billingprovince:string;

}
