import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { adminProductActions } from './adminProductSlice';
import DeleteDiaLog from 'sharedComponents/dialogs/dialogs';
import { useRedux } from 'hooks';
import { selectProductsList } from 'features/shop/providers/productSelectors';
import { productActions } from 'features/shop/providers/productSlice';
import { clearState } from 'storeConfig/api/apiSlice';

interface Product {
    _id:string;
    productid:number;
    productname: string;
    image: string;
    shortDescription:string;
    fullDescription:string;
    price:number;
    stock: string;
}

/* eslint-disable */
export default function Products() {
    
    const emptyProduct:Product = {
        _id:'dummy',
        productid:0,
        shortDescription:'',
        fullDescription:'',
        productname: '', 
        image:  '',
        price:0,
        stock: ''
    }
     
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [products, setProducts] = useState<any>([]);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState<any>(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);
    const { dispatch, appSelector } = useRedux();
    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    useEffect(() => {
        dispatch(productActions.fetchproductList());
    }, [dispatch]);
   
    const productDetails:any = appSelector(selectProductsList);
 
    const formatCurrency = (value:any) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    const openNew = () => {
        navigate("/admin/products/add");
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

   
    const onGlobalFilterChange = (event:any) => {
        const value = event.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
    };

    const editProduct = (data:any) => {
        navigate("/admin/products/edit/"+data._id);
    };

    const confirmDeleteProduct = (product:any) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    useEffect(() => {
        if (successMessage) {
            showToast('success', 'Success', successMessage);
            dispatch(clearState());
        }

        if (error) {
            showToast('error', 'Error', error);
            dispatch(clearState());
        }
    }, [successMessage, error, dispatch]);

    const deleteProduct = () => {
        const _products = products.filter((val:any) => val !== product._id);
        setProducts(_products);
        dispatch(adminProductActions.deleteProduct({_id:product._id}))
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const leftToolbarTemplate = () => (
        <div className="flex flex-wrap gap-2">
            <Button label="New" icon="pi pi-plus me-1" severity="success" onClick={openNew} />
        </div>
    );

    const rightToolbarTemplate = () => <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    const imageBodyTemplate = (rowData:any) => <img  src={`${window.location.origin}/${rowData.image[0]}`} alt={rowData.image[0]} className="shadow-2 border-round" style={{ width: '64px' }} />;
    const priceBodyTemplate = (rowData:any) => formatCurrency(rowData.price);
    const statusBodyTemplate = (rowData:any) => <Tag value={rowData.stock} severity={getSeverity(rowData)} />;
    const actionBodyTemplate = (rowData:any) => (
        <>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
            <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
        </>
    );

    const getSeverity = (product:any) => {
        if(product.stock > 20){
            return 'success';
        } else if(product.stock >= 10 && product.stock <= 20 ){
            return 'warning';
        } else if(product.stock < 9){
            return 'danger';
        }
    };

    const header = () => {
        const value = filters['global'] ? filters['global'].value : '';
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Products</h4>
            <span className="p-input-icon-left mb-1">
                <i className="pi pi-search" />
                <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Search products" />
            </span>
        </div>
        )
    }
    
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate} />

                <DataTable
                    ref={dt}
                    filters={filters} onFilter={(e:any) => setFilters(e.filters)}
                    value={productDetails}
                    selection={selectedProducts} 
                    onSelectionChange={(e:any) => setSelectedProducts(e.value)} 
                    dataKey="_id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column field="name" header="ProductName" sortable style={{ minWidth: '10rem' }} />
                    <Column field="image" header="Image" body={imageBodyTemplate} />
                    <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '5rem' ,textAlign:'center'}} />
                    <Column field="stock" header="Stock" body={statusBodyTemplate} sortable style={{ minWidth: '3rem' }} />
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '6rem',textAlign:'center' }} />
                </DataTable>
            </div>

            <DeleteDiaLog 
                deleteonClick={deleteProductDialog}
                deleteDialogFooter={deleteProductDialogFooter}
                hideDeleteDialog={hideDeleteProductDialog}
                deleteTitle={product.productname}
                dataLength={product}
            />
          

        </div>
    );
}
