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
import { adminDonationTypeActions } from './donationSlice';
import { selectDonationTypes } from './donationSelector';

import DeleteDiaLog from 'sharedComponents/dialogs/dialogs';
import { useRedux } from 'hooks';
import { clearState } from 'storeConfig/api/apiSlice';
import { DonationTypes } from 'models';
import Image from 'sharedComponents/Image/image';

/* eslint-disable */
export default function ManageDonationTypes() {
    
    const emptyDonation:DonationTypes = {
            _id:'dummy',
            type:'',
            frequency:'',
            description:'',
            image:'',
            denominations:'',
    }
     
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [DonationTypes, setDonationTypes] = useState<any>([]);
    const [deleteDonationDialog, setDeleteDonationDialog] = useState(false);
    const [Donation, setDonation] = useState(emptyDonation);
    const [selectedDonationTypes, setSelectedDonationTypes] = useState<any>(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);
    const { dispatch, appSelector } = useRedux();
    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    useEffect(() => {
        dispatch(adminDonationTypeActions.getDonationDetails());
    }, [dispatch]);
   
    const DonationDetails:any = appSelector(selectDonationTypes);

    console.log("DonationDetails",DonationDetails);
 
    const formatCurrency = (value:any) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    const openNew = () => {
        navigate("/admin/DonationTypes/add");
    };

    const hideDeleteDonationDialog = () => {
        setDeleteDonationDialog(false);
    };

   
    const onGlobalFilterChange = (event:any) => {
        const value = event.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
    };

    const editDonation = (data:any) => {
        navigate("/admin/DonationTypes/edit/"+data._id);
    };

    const confirmDeleteDonation = (Donation:any) => {
        setDonation(Donation);
        setDeleteDonationDialog(true);
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

    const deleteDonation = () => {
        const _DonationTypes = DonationTypes.filter((val:any) => val !== Donation._id);
        setDonationTypes(_DonationTypes);
        dispatch(adminDonationTypeActions.deleteDonation({_id:Donation._id}))
        setDeleteDonationDialog(false);
        setDonation(emptyDonation);
        
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
    const imageBodyTemplate = (rowData:any) => <Image  imageUrl={`${rowData?.image}`} altText={rowData.DonationName} classname="shadow-2 border-round" style={{ width: '64px' }} />;
    const priceBodyTemplate = (rowData:any) => formatCurrency(rowData.price);
    const statusBodyTemplate = (rowData:any) => <Tag value={rowData.stock} severity={getSeverity(rowData)} />;
    const actionBodyTemplate = (rowData:any) => (
        <>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editDonation(rowData)} />
            <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteDonation(rowData)} />
        </>
    );

    const getSeverity = (Donation:any) => {
        if(Donation.stock > 20){
            return 'success';
        } else if(Donation.stock >= 10 && Donation.stock <= 20 ){
            return 'warning';
        } else if(Donation.stock < 9){
            return 'danger';
        }
    };

    const header = () => {
        const value = filters['global'] ? filters['global'].value : '';
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage DonationTypes</h4>
            <span className="p-input-icon-left mb-1">
                <i className="pi pi-search" />
                <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Search DonationTypes" />
            </span>
        </div>
        )
    }
       

    const deleteDonationDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteDonationDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteDonation} />
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
                    value={DonationDetails}
                    selection={selectedDonationTypes} 
                    onSelectionChange={(e:any) => setSelectedDonationTypes(e.value)} 
                    dataKey="_id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} DonationTypes"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column field="type" header="Donation type" sortable style={{ minWidth: '10rem' }} />
                    <Column field="frequency" header="Frequency" sortable style={{ minWidth: '8rem' }} />
                    <Column field="denominations" header="Price" sortable style={{ minWidth: '10rem' }} />
                    <Column field="image" header="Image" body={imageBodyTemplate} />
                    {/* <Column field="deleted" header="isActive" body={verifiedBodyTemplate} sortable style={{ minWidth: '3rem' }} /> */}
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '6rem',textAlign:'center' }} />
                </DataTable>
            </div>

            <DeleteDiaLog 
                deleteonClick={deleteDonationDialog}
                deleteDialogFooter={deleteDonationDialogFooter}
                hideDeleteDialog={hideDeleteDonationDialog}
                deleteTitle={Donation.type}
                dataLength={Donation}
            />
          

        </div>
    );
}
