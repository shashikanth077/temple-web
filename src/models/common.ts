export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

export interface SingleResponse<T> {
  data: T;
  errorCode:any;
  success:boolean;
  errorMessage:string;
}

export interface UserResponse{
  errorCode:any;
  id:string;
  success:boolean;
  message:string;
  errorMessage:string;
}

export interface OTPResponse {
  errorCode:any;
  otp:string;
  success:boolean;
  message:string;
  error:string;
  errorMessage:string;
}

export interface UserSuccesResponse{
  errorCode:any;
  countrycode:string;
  email:string;
  phonenumber:string;
  success:boolean;
  message:string;
  error:string;
  errorMessage:string;
}

export interface SuccesResponse{
  errorCode:any;
  success:boolean;
  message:string;
  error:string;
  errorMessage:string;
}

export interface ListParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc',

  [key: string]: any;
}
