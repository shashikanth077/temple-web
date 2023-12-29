export interface Cart {
    cartid:number;
    totalprice:number;
    finaldiscountedprice:number;
    totalcartvalue:number;
    userid:number;
    sessionId:string;
    products:[{
        quantity:number;
        product_id:string;
        product_name:string;
        product_price:number;
        product_image:string;
        discount:number;
    }]

}

export interface AddtoCartRes{
    cart_id: number;
    totalProductCount:number;
    totalCartCount: number;
    totalPrice: number;
}
