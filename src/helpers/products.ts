// get product discount price
export const getDiscountPrice = (price:number, discount:number) => (discount && discount > 0 ? price - price * (discount / 100) : null);

// get individual element
const getIndividualItemArray = (array:[]) => {
    const individualItemArray = array.filter((v, i, self) => i === self.indexOf(v));
    return individualItemArray;
};

/* eslint-disable */
export const getIndividualCategories = (products:any) => {
    const productCategories:any = [];
    products
    && products.map((product:any) => (
        product.category
        && product.category.map((single:any) => productCategories.push(single))
    ));
    const individualProductCategories = getIndividualItemArray(productCategories);
    return individualProductCategories;
};

export const getIndividualTags = (products:any) => {
    const productTags:any = [];
    products
      && products.map((product:any) => (
          product.tag
          && product.tag.map((single:any) => productTags.push(single))
      ));
    const individualProductTags = getIndividualItemArray(productTags);
    return individualProductTags;
};

export const setActiveSort = (e:any) => {
    const filterButtons = document.querySelectorAll(
        '.sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button',
    );
    filterButtons.forEach(item => {
        item.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
};

export const getSortedProducts = (products:any, sortType:string, sortValue:any) => {
    if (products && sortType && sortValue) {
        if (sortType === 'category') {
            return products.filter(
                (product:any) => product.category.filter((single:any) => single === sortValue)[0],
            );
        }
        if (sortType === 'tag') {
            return products.filter(
                (product:any) => product.tag.filter((single:any) => single === sortValue)[0],
            );
        }
        if (sortType === 'filterSort') {
            const sortProducts = [...products];
            if (sortValue === 'default') {
                return sortProducts;
            }
            if (sortValue === 'priceHighToLow') {
                return sortProducts.sort((a, b) => b.price - a.price);
            }
            if (sortValue === 'priceLowToHigh') {
                return sortProducts.sort(function(a, b) { return a.price - b.price ; });
            }
        }
    }
    return products;
};

export const setActiveLayout = (e:any) => {
    const gridSwitchBtn = document.querySelectorAll('.shop-tab button');
    gridSwitchBtn.forEach(item => {
        item.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
};

export const getProductCartQuantity = (cartItems:any, product:any) => {
    return 0;
  };

  export const cartItemStock = (item:any) => {
    if (item.stock) {
      return item.stock;
    }
    // } else {
    //   return item.variation
    //     .filter((single:any) => single.color === color)[0]
    //     .size.filter((single:any) => single.name === size)[0].stock;
    // }
  };