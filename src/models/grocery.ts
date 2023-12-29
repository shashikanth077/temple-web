export interface CartPayload {
    _id:string;
    quantity:number;
    name:string;
    price:number
}

export interface CartRes{
    message:string;
    userid:string;
    success:string;
    cartItems:CartPayload;
    error:string;
}
