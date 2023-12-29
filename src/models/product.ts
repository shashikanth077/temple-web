export interface Product {
    _id:string;
    name:string;
    image:string;
    shortDescription:string;
    fullDescription:string;
    categories:string[];
    stock:number;
    price:number;
}

export interface ProductSingleRes{
    errorMessage:string;
    errorCode:number;
    product:Product
    success:boolean;
}

export interface ProductListRes{
    errorMessage:string;
    errorCode:number;
    success:boolean;
    products:Product[]
}

export interface Grocery {
    _id:string;
    name:string;
    image:string;
    description:string;
    price:number;
}

export interface GrocerySingleRes{
  errorMessage:string;
  errorCode:number;
  grocery:Grocery
  success:boolean;
}

export interface GroceryListRes{
  errorMessage:string;
  errorCode:number;
  success:boolean;
  groceries:Grocery[]
}
