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
import { useIntl } from 'react-intl';
import { adminBookingActions } from './bookingSlice';
import { selectBookings } from './bookingSelector';
import DeleteDiaLog from 'sharedComponents/dialogs/dialogs';
import { useRedux } from 'hooks';
import { clearState } from 'storeConfig/api/apiSlice';
import { Booking } from 'models';
import Image from 'sharedComponents/Image/image';
import { formatCurrency } from 'helpers/currency';

/* eslint-disable */
export default function ManageBookings() {
    
    const emptyBooking:Booking = {
        _id:'dummy',
        amount:'',
        bookingType:'',
        category:"",
        name:'',
        image:'',
        description:'',
    }
     
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const intl = useIntl();

    const [Bookings, setBookings] = useState<any>([]);
    const [deleteBookingDialog, setDeleteBookingDialog] = useState(false);
    const [Booking, setBooking] = useState(emptyBooking);
    const [selectedBookings, setSelectedBookings] = useState<any>(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);
    const { dispatch, appSelector } = useRedux();
    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    let defaultPayload = {
        sevaBookingType:"Pre-Booking"
    }
    useEffect(() => {
        dispatch(adminBookingActions.getBookingDetails(defaultPayload));
    }, [dispatch]);
   
    const BookingDetails:any = appSelector(selectBookings);

    const openNew = () => {
        navigate("/admin/bookingtypes/add");
    };

    const hideDeleteBookingDialog = () => {
        setDeleteBookingDialog(false);
    };

   
    const onGlobalFilterChange = (event:any) => {
        const value = event.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
    };

    const editBooking = (data:any) => {
        navigate("/admin/bookingtypes/edit/"+data._id);
    };

    const confirmDeleteBooking = (Booking:any) => {
        setBooking(Booking);
        setDeleteBookingDialog(true);
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

    const deleteBooking = () => {
        const _Bookings = Bookings.filter((val:any) => val !== Booking._id);
        setBookings(_Bookings);
        dispatch(adminBookingActions.deleteBooking({_id:Booking._id}))
        setDeleteBookingDialog(false);
        setBooking(emptyBooking);
        
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
    const imageBodyTemplate = (rowData:any) => <Image  imageUrl={`${rowData?.image}`} altText={rowData.BookingName} classname="shadow-2 border-round" style={{ width: '64px' }} />;
    const priceBodyTemplate = (rowData:any) => formatCurrency(intl,rowData?.amount);
    const statusBodyTemplate = (rowData:any) => <Tag value={rowData.stock} severity={getSeverity(rowData)} />;
    const actionBodyTemplate = (rowData:any) => (
        <>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editBooking(rowData)} />
            <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteBooking(rowData)} />
        </>
    );

    const getSeverity = (Booking:any) => {
        if(Booking.stock > 20){
            return 'success';
        } else if(Booking.stock >= 10 && Booking.stock <= 20 ){
            return 'warning';
        } else if(Booking.stock < 9){
            return 'danger';
        }
    };

    const header = () => {
        const value = filters['global'] ? filters['global'].value : '';
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage seva types</h4>
            <span className="p-input-icon-left mb-1">
                <i className="pi pi-search" />
                <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Search Booking types" />
            </span>
        </div>
        )
    }
       
    const deleteBookingDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteBookingDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteBooking} />
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
                    value={BookingDetails}
                    selection={selectedBookings} 
                    onSelectionChange={(e:any) => setSelectedBookings(e.value)} 
                    dataKey="_id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Bookings types"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column field="sevaBookingType" header="Booking type" sortable style={{ minWidth: '10rem' }} />
                    <Column field="name" header="Booking name" sortable style={{ minWidth: '8rem' }} />
                    <Column field="category"  header="Category" sortable style={{ minWidth: '8rem' }} />
                    <Column field="amount" body={priceBodyTemplate} header="Amount" sortable style={{ minWidth: '8rem' }} />
                    <Column field="image" header="Image" body={imageBodyTemplate} />
                    {/* <Column field="deleted" header="isActive" body={verifiedBodyTemplate} sortable style={{ minWidth: '3rem' }} /> */}
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '6rem',textAlign:'center' }} />
                </DataTable>
            </div>

            <DeleteDiaLog 
                deleteonClick={deleteBookingDialog}
                deleteDialogFooter={deleteBookingDialogFooter}
                hideDeleteDialog={hideDeleteBookingDialog}
                deleteTitle={Booking.name}
                dataLength={Booking}
            />
          

        </div>
    );
}
