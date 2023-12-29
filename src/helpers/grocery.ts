// get groceries
export const getGroceries = (groceries:any, type:string, limit:number) => groceries.slice(0, limit || groceries.length);

/* eslint no-underscore-dangle: 0 */
// get grocery cart quantity
export const getGroceryCartQuantity = (cartItems:any, grocery:any) => {
    const groceryInCart = cartItems.find((single:any) => single._id === grocery._id);
    if (cartItems.length >= 1 && groceryInCart) {
        return cartItems.find((single:any) => grocery.id === single.id).quantity;
    }
    return 0;
};

// // get individual element
// const getIndividualItemArray = (array:any) => {
//     const individualItemArray = array.filter((v, i, self) => i === self.indexOf(v));
//     return individualItemArray;
// };
