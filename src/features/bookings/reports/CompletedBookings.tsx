import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useReactToPrint } from 'react-to-print';
import { myBookingsActions } from '../bookingSlice';
import { selectBookingsList } from '../bookingSelector';
import InvoiceBooking from './printBookInvoice';
import { useRedux } from 'hooks';

/* eslint-disable */
export default function CompletedBookings() {
 

    const componentRef = useRef(null);
 
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

    
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [BookingDialog, setBookingDialog] = useState(false)
    const [selectedBookings, setSelectedBookings] = useState<any>(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [BookingId,setBookingId] = useState<string>('');
    const dt = useRef<any>(null);
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(myBookingsActions.getBookings({ userid: '1' }));
    }, [dispatch]);

    const BookingList: any = appSelector(selectBookingsList);

    const onGlobalFilterChange = (event: any) => {
        const value = event.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
    };

    const viewBooking = (data: any) => {
        setBookingId(data._id);
        setBookingDialog(true);
    };


    const hideDialog = () => {
        setBookingDialog(false);
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const BookingDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
        </React.Fragment>
    );

    const rightToolbarTemplate = () => <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    const actionBodyTemplate = (rowData: any) => (
        <>
            <Button icon="pi pi-eye" rounded outlined className="mr-2" onClick={() => viewBooking(rowData)} />
            {/* <Button icon="pi pi-print" rounded outlined className="mr-2" onClick={() => handlePrint()} /> */}
        </>
    );

    const header = () => {
        const value = filters['global'] ? filters['global'].value : '';
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 className="m-0">Completed bookings</h4>
                <span className="p-input-icon-left mb-1">
                    <i className="pi pi-search" />
                    <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Search Bookings" />
                </span>
            </div>
        )
    }


    return (
        <div>
            {/* <div style={{ display: "none" }}><PrintComponent ref={componentRef} /></div> */}
            {/* <Toast ref={toast} /> */}
            <div className="">

                <DataTable
                    ref={dt}
                    filters={filters} onFilter={(e: any) => setFilters(e.filters)}
                    value={BookingList}
                    selection={selectedBookings}
                    onSelectionChange={(e: any) => setSelectedBookings(e.value)}
                    dataKey="_id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Upcoming bookings"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column field="type" header="Booking type" />
                    <Column field="orderdate" header="Date" />
                    <Column field="totalAmount" header="Amount" />
                    <Column field="orderStatus" header="Order Status" />
                    <Column field="programDate" header="Program date" />
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '6rem', textAlign: 'center' }} />
                </DataTable>
            </div>

            <Dialog visible={BookingDialog} style={{ width: '60rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Booking details" modal className="p-fluid" footer={BookingDialogFooter} onHide={hideDialog}>
                <InvoiceBooking BookingId={BookingId} BookingData={BookingList}/>
            </Dialog>


        </div>
    );
}
