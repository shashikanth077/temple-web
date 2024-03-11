import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { classNames } from 'primereact/utils';
import moment from 'moment';
import InvoiceBooking from './invoice';
import { myBookingsActions } from 'member/features/bookings/bookingSlice';
import { selectOrderHistry } from 'member/features/bookings/bookingSelector';
import { useRedux, useUser } from 'hooks';
import { getApiState } from 'storeConfig/apiStatus/apiSelector';

/* eslint-disable */
export default function ShopOrders() {
 
    const componentRef = useRef(null);
    const [loggedInUser] = useUser();
    const [orderId, setOrderId] = useState<string>('');
 
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

    const navigate = useNavigate();
    const { loading, error, successMessage } = useSelector(getApiState);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [BookingDialog, setBookingDialog] = useState(false)
    const [selectedBookings, setSelectedBookings] = useState<any>(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef<any>(null);
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(myBookingsActions.getOrders({ userId: loggedInUser?.id,type:"shop-orders"}));
    }, [dispatch]);

    const BookingList: any = appSelector(selectOrderHistry);
    
    const onGlobalFilterChange = (event: any) => {
        const value = event.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
    };

    const viewBooking = (data: any) => {
        setOrderId(data._id);
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

    const formatDate = (rowData: any) => moment(rowData).format('DD-MM-YYYY');

    const rightToolbarTemplate = () => <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    const actionBodyTemplate = (rowData: any) => (
        <>
            <Button icon="pi pi-eye" rounded outlined className="mr-2" onClick={() => viewBooking(rowData)} />
        </>
    );

    const header = () => {
        const value = filters['global'] ? filters['global'].value : '';
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 className="m-0">Orders</h4>
                <span className="p-input-icon-left mb-1">
                    <i className="pi pi-search" />
                    <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Search Bookings" />
                </span>
            </div>
        )
    }

    return (
        <div>
           
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
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Bookings"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column field="OrderId" header="OrderId" />
                    <Column field="amount" header="amount" />
                    <Column
                        field="transStatus"
                        sortable
                        style={{ width: "2rem" }}
                        header="Transaction Status"
                        body={(rowData: any) => (
                            <span
                                className={classNames({
                                    "p-tag p-tag-success":
                                        rowData.transStatus === "succeeded",
                                    "p-tag p-tag-danger":
                                        rowData.transStatus === "failed",
                                    "p-tag p-tag-new":
                                        rowData.transStatus === "new",
                                })}
                            >
                                {rowData.transStatus}
                            </span>
                        )}
                    />
                    <Column field="OrderDate" sortable header="Order date" body={(rowData) => formatDate(rowData.OrderDate)} />
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '6rem', textAlign: 'center' }} />
                </DataTable>
            </div>


            <Dialog visible={BookingDialog} style={{ width: '60rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Booking details" modal className="p-fluid" footer={BookingDialogFooter} onHide={hideDialog}>
                <InvoiceBooking orderid={orderId} orderData={BookingList} />
            </Dialog>


        </div>
    );
}
