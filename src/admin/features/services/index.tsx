import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import classNames from 'classnames';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { adminServiceActions } from './serviceSlice';
import { selectServices } from './serviceSelector';

import DeleteDiaLog from 'sharedComponents/dialogs/dialogs';
import { useRedux } from 'hooks';
import { clearState } from 'storeConfig/api/apiSlice';
import { AdminService } from 'models';
import Image from 'sharedComponents/Image/image';

/* eslint-disable */
export default function Services() {
    
    const emptyService:AdminService = {
            _id:'dummy',
            godId:'',
            frequency:'',
            occurmonth:'',
            dayahead:'',
            serviceType:'',
            serviceName:'',
            description:'',
            image:'',
            bookingType:'',
            price:'',
            accountNumber:'',
            isTaxable:true
    }
     
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [Services, setServices] = useState<any>([]);
    const [deleteServiceDialog, setDeleteServiceDialog] = useState(false);
    const [Service, setService] = useState(emptyService);
    const [selectedServices, setSelectedServices] = useState<any>(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);
    const { dispatch, appSelector } = useRedux();
    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    useEffect(() => {
        dispatch(adminServiceActions.getServiceDetails());
    }, [dispatch]);
   
    const ServiceDetails:any = appSelector(selectServices);

    console.log("ServiceDetails",ServiceDetails);
 
    const formatCurrency = (value:any) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    const openNew = () => {
        navigate("/admin/services/add");
    };

    const hideDeleteServiceDialog = () => {
        setDeleteServiceDialog(false);
    };

   
    const onGlobalFilterChange = (event:any) => {
        const value = event.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
    };

    const editService = (data:any) => {
        navigate("/admin/services/edit/"+data._id);
    };

    const confirmDeleteService = (Service:any) => {
        setService(Service);
        setDeleteServiceDialog(true);
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

    const deleteService = () => {
        const _Services = Services.filter((val:any) => val !== Service._id);
        setServices(_Services);
        dispatch(adminServiceActions.deleteService({_id:Service._id}))
        setDeleteServiceDialog(false);
        setService(emptyService);
        
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const leftToolbarTemplate = () => (
        <div className="flex flex-wrap gap-2">
            <Button label="New" icon="pi pi-plus me-1" severity="success" onClick={openNew} />
        </div>
    );

    const verifiedBodyTemplate = (rowData:any) => {
        return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.isActive, 'false-icon pi-times-circle': !rowData.isActive })}></i>;
    };

    const rightToolbarTemplate = () => <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    const imageBodyTemplate = (rowData:any) => <Image  imageUrl={`${rowData?.image}`} altText={rowData.serviceName} classname="shadow-2 border-round" style={{ width: '64px' }} />;
    const priceBodyTemplate = (rowData:any) => formatCurrency(rowData.price);
    const statusBodyTemplate = (rowData:any) => <Tag value={rowData.stock} severity={getSeverity(rowData)} />;
    const actionBodyTemplate = (rowData:any) => (
        <>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editService(rowData)} />
            <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteService(rowData)} />
        </>
    );

    const getSeverity = (Service:any) => {
        if(Service.stock > 20){
            return 'success';
        } else if(Service.stock >= 10 && Service.stock <= 20 ){
            return 'warning';
        } else if(Service.stock < 9){
            return 'danger';
        }
    };

    const header = () => {
        const value = filters['global'] ? filters['global'].value : '';
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Services</h4>
            <span className="p-input-icon-left mb-1">
                <i className="pi pi-search" />
                <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Search Services" />
            </span>
        </div>
        )
    }
       

    const deleteServiceDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteServiceDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteService} />
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
                    value={ServiceDetails}
                    selection={selectedServices} 
                    onSelectionChange={(e:any) => setSelectedServices(e.value)} 
                    dataKey="_id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Services"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column field="godName" header="God name" sortable style={{ minWidth: '10rem' }} />
                    <Column field="serviceName" header="Service name" sortable style={{ minWidth: '8rem' }} />
                    <Column field="daysahead" header="Days ahead" sortable style={{ minWidth: '8rem' }} />
                    <Column field="serviceType" header="Service type" sortable style={{ minWidth: '8rem' }} />
                    <Column field="bookingType" header="Booking type" sortable style={{ minWidth: '5rem' }} />
                    <Column field="price" header="Price" sortable style={{ minWidth: '10rem' }} />
                    <Column field="image" header="Image" body={imageBodyTemplate} />
                    {/* <Column field="deleted" header="isActive" body={verifiedBodyTemplate} sortable style={{ minWidth: '3rem' }} /> */}
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '6rem',textAlign:'center' }} />
                </DataTable>
            </div>

            <DeleteDiaLog 
                deleteonClick={deleteServiceDialog}
                deleteDialogFooter={deleteServiceDialogFooter}
                hideDeleteDialog={hideDeleteServiceDialog}
                deleteTitle={Service.serviceName}
                dataLength={Service}
            />
          

        </div>
    );
}
