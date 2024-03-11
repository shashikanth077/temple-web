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
import { selectGroceries } from './adminGrocerySelector';
import { adminGroceryActions } from './adminGrocerySlice';
import DeleteDiaLog from 'sharedComponents/dialogs/dialogs';
import { useRedux } from 'hooks';
import { clearState } from 'storeConfig/apiStatus/apiSlice';
import { Grocery } from 'models';

/* eslint-disable */
export default function Grocerys() {
    
    const emptyGrocery:Grocery = {
        _id:'dummy',
        description:'',
        name: '', 
        image:  '',
        price:0,
    }
     
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [Grocerys, setGrocerys] = useState<any>([]);
    const [deleteGroceryDialog, setDeleteGroceryDialog] = useState(false);
    const [Grocery, setGrocery] = useState(emptyGrocery);
    const [selectedGrocerys, setSelectedGrocerys] = useState<any>(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);
    const { dispatch, appSelector } = useRedux();
    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    useEffect(() => {
        dispatch(adminGroceryActions.getAllGroceries());
    }, [dispatch]);
   
    const GroceryDetails:any = appSelector(selectGroceries);
 
    const formatCurrency = (value:any) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    const openNew = () => {
        navigate("/admin/groceries/addGrocery");
    };

    const hideDeleteGroceryDialog = () => {
        setDeleteGroceryDialog(false);
    };

   
    const onGlobalFilterChange = (event:any) => {
        const value = event.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
    };

    const editGrocery = (data:any) => {
        navigate("/admin/groceries/editGrocery/"+data._id);
    };

    const confirmDeleteGrocery = (Grocery:any) => {
        setGrocery(Grocery);
        setDeleteGroceryDialog(true);
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

    const deleteGrocery = () => {
        const _Grocerys = Grocerys.filter((val:any) => val !== Grocery._id);
        setGrocerys(_Grocerys);
        dispatch(adminGroceryActions.deleteGrocery({_id:Grocery._id}))
        setDeleteGroceryDialog(false);
        setGrocery(emptyGrocery);
        
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
    const imageBodyTemplate = (rowData:any) => <img  src={`${window.location.origin}/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    const priceBodyTemplate = (rowData:any) => formatCurrency(rowData.price);
    const statusBodyTemplate = (rowData:any) => <Tag value={rowData.stock} severity={getSeverity(rowData)} />;
    const actionBodyTemplate = (rowData:any) => (
        <>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editGrocery(rowData)} />
            <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteGrocery(rowData)} />
        </>
    );

    const getSeverity = (Grocery:any) => {
        if(Grocery.stock > 20){
            return 'success';
        } else if(Grocery.stock >= 10 && Grocery.stock <= 20 ){
            return 'warning';
        } else if(Grocery.stock < 9){
            return 'danger';
        }
    };

    const header = () => {
        const value = filters['global'] ? filters['global'].value : '';
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Groceries</h4>
            <span className="p-input-icon-left mb-1">
                <i className="pi pi-search" />
                <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Search Grocerys" />
            </span>
        </div>
        )
    }
    
    const deleteGroceryDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteGroceryDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteGrocery} />
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
                    value={GroceryDetails}
                    selection={selectedGrocerys} 
                    onSelectionChange={(e:any) => setSelectedGrocerys(e.value)} 
                    dataKey="_id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Grocerys"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column field="name" header="Grocery name" sortable style={{ minWidth: '10rem' }} />
                    <Column field="image" header="Image" body={imageBodyTemplate} />
                    <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '5rem' ,textAlign:'center'}} />
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '6rem',textAlign:'center' }} />
                </DataTable>
            </div>

            <DeleteDiaLog 
                deleteonClick={deleteGroceryDialog}
                deleteDialogFooter={deleteGroceryDialogFooter}
                hideDeleteDialog={hideDeleteGroceryDialog}
                deleteTitle={Grocery.name}
                dataLength={Grocery}
            />
          

        </div>
    );
}
