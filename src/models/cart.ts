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

interface CartItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    _id: string;
    // ... other properties
  }

export interface CartData {
    _id: string;
    owner: string;
    totalProducts: number;
    totalQuantity: number;
    totalPrice: number;
    items: CartItem[];
    createdAt: string;
    updatedAt: string;
    // ... other properties
  }

export interface AddtoCartRes{
    cart_id: number;
    totalProductCount:number;
    totalCartCount: number;
    totalPrice: number;
    cartCount:number;
}
