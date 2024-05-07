import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import CartGrocery from './groceryCart';
import { selectCurrentGroceryCartItems } from './grocerySelector';
import { addToCart } from './grocerySlice';
import { selectGroceries } from 'admin/features/grocery/adminGrocerySelector';
import { useRedux } from 'hooks';
import { Grocery } from 'models';
import { adminGroceryActions } from 'admin/features/grocery/adminGrocerySlice';
import { getApiState } from 'storeConfig/apiStatus/apiSelector';

/* eslint no-underscore-dangle: 0 */
/* eslint-disable */
export default function Grocerys() {
    
    const emptyGrocery:Grocery = {
        _id:'dummy',
        description:'',
        name: '', 
        image:  '',
        price:0,
    }

    const toast = useRef<any>(null);
    const dt = useRef<any>(null);
    const { dispatch, appSelector } = useRedux();
    const [layout, setLayout] = useState<any>('grid');

    useEffect(() => {
        dispatch(adminGroceryActions.getAllGroceries());
    }, [dispatch]);
   
    const GroceryDetails:any = appSelector(selectGroceries);
    const formatCurrency = (value:any) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    const CurrentCart:any = appSelector(selectCurrentGroceryCartItems);

    const AddtoCart = (product:any) => {
        dispatch(addToCart({
            ...product
        }))
    }

    const listItem = (product:any) => {
        return (
            <div className="">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`assets/images/grocery/${product._id}.jpg`} alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl grid-grocery-text font-bold text-900">{product.name}</div>
                           <div className="flex align-items-center gap-3">
                           <span className="text-2xl font-semibold">${product.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" ></Button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    };

       const gridItem = (product:any) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="card grocery-card bg-light d-flex flex-fill">
                    <div className="card-header grocery-header text-muted border-bottom-0">
                    </div>
                    <div className="card-body pt-0">
                        <div className="row">
                        <div className="p-4 border-1 surface-border grocery-surface surface-card border-round">
                            <div className="flex flex-column align-items-center gap-3 py-5">
                                <img className="w-9 grocery-images shadow-2 border-round" src={`${window.location.origin}/assets/images/grocery/${product._id}.jpg`} alt={product.name} />
                                <div className="grid-grocery-text  font-bold">{product.name}</div>
                            </div>
                            <div className="flex align-items-center justify-content-between">
                                <span className="text-2xl font-semibold">${product.price}</span>
                                <Button onClick={() => AddtoCart(product) } icon="pi pi-shopping-cart" className="p-button-rounded" >
                                 </Button>
                                </div>
                        </div>
                    </div>
                    </div>
               </div>
            </div>
        );
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

   const itemTemplate = (product:any, layout:any) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product);
        else if (layout === 'grid') return gridItem(product);
    };

    return (
        <div className='row'>
            <div className='col-md-8'>
             <DataView value={GroceryDetails} itemTemplate={itemTemplate} layout={'grid'}  paginator rows={10} />
           </div>
           <div className='col-md-4'>
                <CartGrocery currentItems={CurrentCart}/>
           </div>
        </div>
    )
}
